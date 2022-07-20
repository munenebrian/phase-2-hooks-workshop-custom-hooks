import styled from "styled-components";
import React, { useEffect, useState } from "react";

export function usePokemon(query) {
  const [{ data, errors, status }, setState] = useState({
    data: null,
    errors: null,
    status: "idle",
  });

  useEffect(() => {
    setState(state => ({ ...state, errors: null, status: "pending" }));
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then(r => {
        if (r.ok) {
          return r.json();
        } else {
          return r.text().then(err => {
            throw err;
          });
        }
      })
      .then(data => {
        setState({ data, errors: null, status: "fulfilled" });
      })
      .catch(err => {
        setState({ data: null, errors: [err], status: "rejected" });
      });
  }, [query]);

  return { data, status, errors };
}

function Pokemon({ query }) {
  const { data: pokemon, status, errors } = usePokemon(query);

  if (status === "idle" || status === "pending") {
    return <h3>Loading....</h3>;
  }

  if (status === "rejected") {
    return (
      <div>
        <h3>Error</h3>
        {errors.map(e => (
          <p key={e}>{e}</p>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h3>{pokemon.name}</h3>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name + " front sprite"}
      />
    </div>
  );
}

export default function App() {
  const [query, setQuery] = useState("charmander");

  function handleSubmit(e) {
    e.preventDefault();
    setQuery(e.target.search.value);
  }

  return (
    <Wrapper>
      <h1>PokéSearcher</h1>
      <Pokemon query={query} />
      <form onSubmit={handleSubmit}>
        <input type="text" name="search" defaultValue={query} />
        <button type="submit">Search</button>
      </form>
    </Wrapper>
  );
}
