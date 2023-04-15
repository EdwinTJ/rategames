import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { Pagination } from "antd";
//TODO: Delete InfiniteScroll,useInfiniteScroll from package.json
const Review = () => {
  const { id } = useParams();
  const { user, isSignedIn } = useUser();
  //Fetch states
  const [games, setGames] = useState<any>([]);
  const [comments, setComments] = useState<any>([]);
  const [imageUrl, setImageUrl] = useState<string>();
  //Form State
  const [text, setText] = useState<string>("");
  //Infinite Scroll State
  const [pageNumber, setPageNumber] = useState(1);
  const [count, setCount] = useState(0);
  ///Fetch Data Functions
  const fetchGames = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/posts/single/${id}`
    );
    Promise.all([data]).then((values) => {
      setImageUrl(values[0].post.image.url);
      setGames(values[0].post);
    });
  };

  const fetchComments = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/comments/${id}?&pageNumber=${pageNumber}`
    );
    setComments(data.comment);
    setCount(data.count);
  };

  //UseEffect Hooks
  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    fetchComments();
  }, [pageNumber]);
  //Functions

  const submitForm = async (e: any) => {
    e.preventDefault();
    const value = e.target[0].value;
    console.log(value.length);
    console.log(!isNaN(value));
    if (!isNaN(value)) {
      // true if its a number, false if not
      toast.error("Please enter a emoji");
      return;
    }
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/comments/new/${id}`,
        {
          text,
          authorId: user?.username,
        }
      );
      if (data.success === true) {
        setText("");
        toast.success("Comment posted successfully!");
        if (typeof window !== "undefined") {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        const zodError = error.response.data.issues;
        if (zodError) {
          const errors = zodError.map((err: any) => err.message);
          errors.forEach((error: any) => {
            toast.error(error);
          });
        }
      }
    }
  };
  return (
    <main>
      <section className="mb-3">
        <div className="d-flex justify-content-center ">
          <div className="card-mb3">
            <img src={imageUrl} className="img-fluid" alt="..." />
            <div className="card-body">
              <h5 className="card-title" style={{ textAlign: "center" }}>
                {games.title}
              </h5>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          {!isSignedIn && <p>You ned to be login in</p>}
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
          <h3>Comments:</h3>
          {comments.map((comment: any) => (
            <div className="comment" key={comment.id}>
              <h3>{comment.authorID}</h3>
              <p>{comment.text}</p>
              <button type="button" className="btn btn-outline-primary">
                Post
              </button>
            </div>
          ))}
          <Pagination
            style={{ float: "right", marginTop: "5px", marginBottom: "500px" }}
            current={pageNumber}
            total={count}
            onChange={(prev) => setPageNumber(prev)}
            pageSize={6}
          />
        </div>
      </section>
    </main>
  );
};

export default Review;
