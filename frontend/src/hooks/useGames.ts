import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useGames = () => {
  const { id } = useParams();
  // Fetch states
  const [games, setGames] = useState([]);
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    const fetchGames = async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/posts/single/${id}`
      );
      Promise.all([data]).then((values) => {
        setImageUrl(values[0].post.image.url);
        setGames(values[0].post);
      });
    };
    fetchGames();
  }, [id]);

  return {
    games,
    imageUrl,
  };
};
