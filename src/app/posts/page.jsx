import { auth } from "@clerk/nextjs/server";
import { db } from "@/utilities/db";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import PostForm from "@/components/postForm.jsx";
import UserForm from "@/components/userForm";
import { createPostAction, userFormAction } from "@/components/actions.jsx";
import Link from "next/link";

export default async function PostsPage() {
  const { userId } = await auth();
  const resultUser = await db.query(`SELECT * FROM users WHERE clerk_id=$1`, [
    userId,
  ]);
  const numUsers = resultUser.rowCount;

  const resultPosts = await db.query(
    `SELECT 
      posts.id, 
      posts.title,
      posts.content,
      users.username,
      users.id AS users_id
    FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.id DESC`
  );
  const posts = resultPosts.rows;

  return (
    <div>
      <SignedIn>
        {numUsers === 1 ? (
          <PostForm createPostAction={createPostAction} />
        ) : (
          <UserForm userFormAction={userFormAction} />
        )}
      </SignedIn>

      <SignedOut>
        <Link href="/sign-in">sign in to make a post</Link>
      </SignedOut>

      <div className="posts-container">
        {posts.map((post) => {
          return (
            <div key={post.id} className="post">
              <h3>
                <Link href={"/profile"}>{post.username}</Link>
              </h3>
              <h2>
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
              </h2>
              <p>{post.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
