import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
const Review = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [games, setGames] = useState<any>([]);
  const [comments, setComments] = useState<any>([]);
  const fetchGames = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/posts/single/${id}`
    );
    setGames(data.post);
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

  return (
    <main>
      <section className="mb-3">
        <div className="d-flex justify-content-center ">
          <div className="card-mb3">
            <img
              src="https://picsum.photos/200/300"
              className="img-fluid"
              alt="..."
            />
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
          <div className="comment">
            <img
              src={user?.profileImageUrl}
              style={{ width: "9%", borderRadius: "50%" }}
            />
            <p>{user?.username}</p>
            <input type="text" />
            <button type="button" className="btn btn-outline-primary">
              Post
            </button>
          </div>
          <h3>Comments:</h3>
          {comments.map((comment: any) => (
            <div className="comment">
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
