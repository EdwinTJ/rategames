import Card from "../Components/UIElements/Card";
import { Pagination } from "antd";
import { useAllGames } from "../hooks/useGame";

interface Games {
  id: string;
  title: string;
  image: { url: string };
}

const Home = () => {
  const { games, count, pageNumber, setPageNumber } = useAllGames();
  return (
    <main>
      <section className="container">
        <h1 className="text-center">Games</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {/* Start One Card */}
          {games.map((games: Games) => {
            return (
              <Card
                key={games.id}
                id={games.id}
                title={games.title}
                image={games.image.url}
              />
            );
          })}
          {/* Start One Card */}
        </div>
        <div className="pagination-margin">
          <Pagination
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
