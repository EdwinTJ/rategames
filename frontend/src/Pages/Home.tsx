import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/UIElements/Card";
import { Pagination } from "antd";

const Home = () => {
  const [games, setGames] = useState<any>([]);
  //Pagination State
  const [pageNumber, setPageNumber] = useState(1);
  const [count, setCount] = useState(0);

  const fetchGames = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/posts?&pageNumber=${pageNumber}`
    );

    setGames(data.post);
    setCount(data.count);
  };

  useEffect(() => {
    fetchGames();
  }, [pageNumber]);
  return (
    <main>
      <section className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {/* Start One Card */}
          {games.map(
            (games: { id: string; title: string; image: { url: string } }) => {
              return (
                <Card
                  key={games.id}
                  id={games.id}
                  title={games.title}
                  image={games.image.url}
                />
              );
            }
          )}
          {/* Start One Card */}
        </div>
        <div className="row">
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

export default Home;
