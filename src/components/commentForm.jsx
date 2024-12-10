"use client";

export default function CommentForm({ addCommentAction, postId }) {
  return (
    <div>
      <form action={addCommentAction}>
        <input type="hidden" name="postId" value={postId} />
        <textarea name="comment" placeholder="Add a comment..." />
        <button>Add</button>
      </form>
    </div>
  );
}
