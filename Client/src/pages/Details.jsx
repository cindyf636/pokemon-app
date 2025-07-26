import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Details.css";

export default function Details() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolvesFromName, setEvolvesFromName] = useState(null);
  const [evolvesToName, setEvolvesToName] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5210/api/pokemon/${id}`).then((res) => {
      setPokemon(res.data);

      // Fetch evolvesFrom name if applicable
      if (res.data.evolvesFrom) {
        axios
          .get(`http://localhost:5210/api/pokemon/name/${res.data.evolvesFrom}`)
          .then((response) => setEvolvesFromName(response.data.name))
          .catch(() => setEvolvesFromName(null));
      } else {
        setEvolvesFromName(null);
      }

      // Fetch evolvesTo name if applicable
      if (res.data.evolvesTo) {
        axios
          .get(`http://localhost:5210/api/pokemon/name/${res.data.evolvesTo}`)
          .then((response) => setEvolvesToName(response.data.name))
          .catch(() => setEvolvesToName(null));
      } else {
        setEvolvesToName(null);
      }
    });
  }, [id]);

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <Link to="/" className="back-button">
        Back to Dashboard
      </Link>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.imageUrl} alt={pokemon.name} width="200" />
      <p>Number: {pokemon.number}</p>
      <p>Type 1: {pokemon.type1}</p>
      <p>Type 2: {pokemon.type2 || "-"}</p>
      <p>Generation: {pokemon.generation}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Moves: {pokemon.moves.join(", ")}</p>

      {pokemon.evolvesFrom && evolvesFromName && (
        <p>
          Evolves from:{" "}
          <Link to={`/pokemon/${pokemon.evolvesFrom}`}>{evolvesFromName}</Link>
        </p>
      )}

      {pokemon.evolvesTo && evolvesToName && (
        <p>
          Evolves to:{" "}
          <Link to={`/pokemon/${pokemon.evolvesTo}`}>{evolvesToName}</Link>
        </p>
      )}
    </div>
  );
}
