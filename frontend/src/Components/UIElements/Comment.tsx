import { useComment } from "../../hooks/useComment";
import { Pagination } from "antd";

const Comment = () => {
  const { comments, count, pageNumber, setPageNumber } = useComment();
  console.log(comments);
  return (
    <>
      <h3 className="comment-title">Comments:</h3>
      {comments.map((comment: any) => (
        <div className="comment" key={comment.id}>
          <h3>{comment.authorID}</h3>
          <p>{comment.text}</p>
        </div>
      ))}
      <div className="pagination-margin">
        <Pagination
          current={pageNumber}
          total={count}
          onChange={(prev) => setPageNumber(prev)}
          pageSize={6}
        />
      </div>
    </>
  );
};

export default Comment;
