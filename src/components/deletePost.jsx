"use client";

export default function DeletePost({ handleDeletePost, postId }) {
  return (
    <div>
      <button onClick={() => handleDeletePost(postId)}>Delete Post</button>
    </div>
  );
}
// callback function used to stop handleDeletePost running as soon as the button in rendered
