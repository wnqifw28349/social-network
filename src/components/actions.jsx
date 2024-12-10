"use server";

import { db } from "@/utilities/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export async function userFormAction(formData) {
  const { userId } = await auth();
  const username = formData.get("username");
  const bio = formData.get("bio");
  await db.query(
    `INSERT INTO users (username, bio, clerk_id) VALUES ($1, $2, $3)`,
    [username, bio, userId]
  );

  revalidatePath("/posts");
}

export async function createPostAction(formData) {
  const { userId } = await auth();
  console.log(userId);
  const title = formData.get("title");
  const content = formData.get("content");
  await db.query(
    `INSERT INTO posts (title, content, user_id) VALUES ($1, $2, (SELECT id FROM users WHERE clerk_id=$3))`,
    [title, content, userId]
  );
  revalidatePath("/posts");
}

export async function addCommentAction(formData) {
  const comment = formData.get("comment");
  const postId = formData.get("postId");

  await db.query(`INSERT INTO comments (post_id, content) VALUES ($1, $2)`, [
    postId,
    comment,
  ]);
  revalidatePath(`/posts/${postId}`);
}

export async function handleDeletePost(postId) {
  const id = postId;
  await db.query(`DELETE FROM comments WHERE comments.post_id=$1`, [id]);
  await db.query(`DELETE FROM posts WHERE id=$1`, [id]);

  revalidatePath("/posts");
  redirect("/posts");
}
