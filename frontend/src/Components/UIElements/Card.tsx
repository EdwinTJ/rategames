import React from "react";
import { Link } from "react-router-dom";
interface CardProps {
  id: string;
  title: string;
  image: string;
}
const Card = ({ title, image, id }: CardProps) => {
  return (
    <div className="col">
      <div className="card h-100">
        <img src={image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
        </div>
        <Link to={`/review/${id}`}>Post A Review</Link>
      </div>
    </div>
  );
};

export default Card;
