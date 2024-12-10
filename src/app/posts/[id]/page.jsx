import { db } from "@/utilities/db";
import CommentForm from "@/components/commentForm";
import DeletePost from "@/components/deletePost";
import { addCommentAction, handleDeletePost } from "@/components/actions";

export default async function IndividualPostPage({ params }) {
  const id = (await params).id;

  const result = await db.query(
    `SELECT 
    posts.id, 
    posts.title, 
    posts.content
  FROM posts
  WHERE posts.id=$1`,
    [id]
  );
  const post = result.rows[0];

  const data = await db.query(
    `SELECT
      comments.post_id,
      ARRAY_AGG(comments.content) AS contents
    FROM comments
    GROUP BY comments.post_id
    HAVING comments.post_id=$1`,
    [id]
  );
  const commentsData =
    data.rows.length > 0 ? data.rows[0] : { contents: ["No Comments Yet"] };

  return (
    <div>
      <div className="single-post-container">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <DeletePost handleDeletePost={handleDeletePost} postId={id} />
      </div>

      <div className="comments-container">
        <h3>Comments</h3>
        <ul>
          {commentsData.contents.map((content, index) => {
            return <p key={index}>{content}</p>;
          })}
        </ul>
        <CommentForm addCommentAction={addCommentAction} postId={id} />
      </div>
    </div>
  );
}
