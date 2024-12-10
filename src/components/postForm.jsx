"use client";

export default function PostForm({ createPostAction }) {
  //passing createPostAction as a prop
  return (
    <div>
      <form action={createPostAction}>
        <label>Title:</label>
        <input name="title" placeholder="Title" />
        <textarea name="content" placeholder="Write something..." />
        <button>Create Post</button>
      </form>
    </div>
  );
}
