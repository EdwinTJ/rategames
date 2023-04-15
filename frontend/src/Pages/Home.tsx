import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/UIElements/Card";
import { Pagination } from "antd";
import { useAllGames } from "../hooks/useGame";
const Home = () => {
  const { games, count, pageNumber, setPageNumber } = useAllGames();
  return (
    <main>
      <section className="container">
        <h1 className="text-center">See Games</h1>
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
        <div>
          <Pagination
            current={pageNumber}
            total={count}
            onChange={(prev) => setPageNumber(prev)}
            pageSize={12}
          />
        </div>
      </section>
    </main>
  );
};

export default Home;
