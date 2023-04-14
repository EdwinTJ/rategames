import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/UIElements/Card";
const Home = () => {
  const [games, setGames] = useState<any>([]);

  const fetchGames = async () => {
    const { data } = await axios.get("http://localhost:8000/api/posts");
    Promise.all(data.post).then((values) => {
      setGames(values);
    });
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <main>
      <section className="container">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {/* Start One Card */}
          {games.map((games: { id: string; title: string; image: string }) => {
            return (
              <Card id={games.id} title={games.title} image={games.image} />
            );
          })}
          {/* Start One Card */}
        </div>
      </section>
    </main>
  );
};

export default Home;
