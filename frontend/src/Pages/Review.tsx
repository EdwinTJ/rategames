import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { Pagination } from "antd";
//Data Fetching
import { useGame } from "../hooks/useGame";
import { useComment } from "../hooks/useComment";
const Review = () => {
  const { id } = useParams();
  const { user, isSignedIn } = useUser();
  //Data Fetching
  const { games, imageUrl } = useGame();
  const { comments, count, pageNumber, setPageNumber } = useComment();

  //Form State
  const [text, setText] = useState<string>("");

  //Functions

  const submitForm = async (e: any) => {
    e.preventDefault();
    const value = e.target[0].value;
    if (!isNaN(value)) {
      // true if its a number, false if not
      toast.error("Please enter a emoji");
      return;
    }
    try {
      const { data } = await axios.post(`api/comments/new/${id}`, {
        text,
        authorId: user?.username,
      });
      if (data.success === true) {
        setText("");
        toast.success("Comment posted successfully!");
        if (typeof window !== "undefined") {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } else {
        const error = data.message;
        toast.error(error);
      }
    } catch (error: any) {
      if (error) {
        const zodError = error.response.data.issues;

        if (zodError) {
          const errors = zodError.map((err: any) => err.message);
          console.log(zodError);
          errors.forEach((error: any) => {
            toast.error(error);
          });
        }
      }
    }
  };
  return (
    <main>
      <section className="container">
        <h1 className="text-center">{games.title}</h1>
        <div className="d-flex justify-content-center ">
          <div className="card-mb3">
            <img src={imageUrl} className="img-fluid" alt="..." />
          </div>
        </div>
      </section>
      <section>
        <div>
          {!isSignedIn && (
            <div className="comment">
              <p>You need to be login to post a review</p>
            </div>
          )}
          {isSignedIn && (
            <form encType="multipart/form-data" onSubmit={submitForm}>
              <div className="comment">
                <img
                  src={user?.profileImageUrl}
                  style={{ width: "9%", borderRadius: "50%" }}
                />
                <h3>{user?.username}</h3>
                <input
                  type="text"
                  required
                  minLength={1}
                  maxLength={55}
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                />
                <button type="submit" className="btn btn-outline-primary">
                  Post
                </button>
              </div>
            </form>
          )}
        </div>
        <div>
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
        </div>
      </section>
    </main>
  );
};

export default Review;
