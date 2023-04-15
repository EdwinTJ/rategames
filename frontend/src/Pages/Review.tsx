import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

const Review = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [games, setGames] = useState<any>([]);
  const [comments, setComments] = useState<any>([]);
  const [imageUrl, setImageUrl] = useState<string>();

  //Form State
  const [text, setText] = useState<string>("");
  const navigate = useNavigate();
  const fetchGames = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/posts/single/${id}`
    );
    Promise.all([data]).then((values) => {
      setImageUrl(values[0].post.image.url);
      setGames(values[0].post);
    });
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchComments = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/comments/${id}`
    );
    setComments(data.comment);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const submitForm = async (e: any) => {
    e.preventDefault();
    console.log(text);
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
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error);
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
          <form encType="multipart/form-data" onSubmit={submitForm}>
            <div className="comment">
              <img
                src={user?.profileImageUrl}
                style={{ width: "9%", borderRadius: "50%" }}
              />
              <p>{user?.username}</p>
              <input
                type="text"
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
              <button type="submit" className="btn btn-outline-primary">
                Post
              </button>
            </div>
          </form>
          <h3>Comments:</h3>
          {comments.map((comment: any) => (
            <div className="comment" key={comment.id}>
              <p>{comment.authorID}</p>
              <p>{comment.text}</p>
              <button type="button" className="btn btn-outline-primary">
                Post
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Review;
