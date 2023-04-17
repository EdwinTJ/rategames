import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export function useComment() {
  const { id } = useParams();

  // Comment state
  const [pageNumber, setPageNumber] = useState(1);
  const [count, setCount] = useState(0);
  const [comments, setComments] = useState<any>([]);

  const fetchComments = async () => {
    const { data } = await axios.get(
      `api/comments/${id}?&pageNumber=${pageNumber}`
    );
    setComments(data.comment);
    setCount(data.count);
  };

  useEffect(() => {
    fetchComments();
  }, [pageNumber]);

  return {
    comments,
    count,
    pageNumber,
    setPageNumber,
  };
  //Does the pageNumber state should be here or in the component?
  //Does this state renders here or above?
}
