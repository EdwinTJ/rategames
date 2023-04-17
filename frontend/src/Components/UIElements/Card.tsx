import React from "react";
import { Link, useNavigate } from "react-router-dom";
interface CardProps {
  id: string;
  title: string;
  image: string;
}

const Card = ({ title, image, id }: CardProps) => {
  const navigate = useNavigate();
  const sendToLink = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate(`/review/${id}`);
  };
  return (
    <div className="col">
      <div className="card h-100">
        <img src={image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <form encType="multipart/form-data" onSubmit={sendToLink}>
            <button type="submit" className="btn btn-outline-secondary">
              Post A Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Card;
