import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type GamePost = {
  title: string;
  image: {
    url: string;
  };
  id: string;
};

export const useGame = () => {
  const { id } = useParams();
  // Fetch states
  const [games, setGames] = useState<GamePost[]>([]);
  const [imageUrl, setImageUrl] = useState<string>();

  const fetchSingleGame = async () => {
    const { data } = await axios.get(`api/posts/single/${id}`);
    Promise.all([data]).then((values) => {
      setImageUrl(values[0].post.image.url);
      setGames(values[0].post);
    });
  };

  useEffect(() => {
    fetchSingleGame();
  }, [id]);

  return {
    games,
    imageUrl,
  };
};

export const useAllGames = () => {
  const [games, setGames] = useState<GamePost[]>([]);
  //Pagination State
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const fetchGames = async () => {
    const { data } = await axios.get(`api/posts?&pageNumber=${pageNumber}`);
    setGames(data.post);
    setCount(data.count);
  };

  useEffect(() => {
    fetchGames();
  }, [pageNumber]);

  return {
    games,
    count,
    pageNumber,
    setPageNumber,
  };
};
