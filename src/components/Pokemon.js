import React, { useEffect, useState } from "react";
import { Container, Row, Form, FormControl } from "react-bootstrap";
import CardComp from "./CardComp";

function capitalizeFirstLetter(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function Pokemon({ searchKeyword }) {
  const [allPokemon, setAllPokemon] = useState([]);
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Call POKEMON from API
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon data.");
        }
        const data = await response.json();

        const pokemonDetailsPromises = data.results.map(async (pokeData) => {
          const response = await fetch(pokeData.url);
          if (!response.ok) {
            throw new Error(`Failed to fetch data for ${pokeData.name}`);
          }

          const details = await response.json();


          let callMove = details.moves[3];
          let move = callMove ? callMove.move.name : undefined;
          if (move === null) {
            return 'Struggle'
          }

          // const moveUrl = details.moves.move.url

          // console.log(move);

          return {
            name: pokeData.name,
            imageUrl: details.sprites.front_default,
            types: details.types.map((type) => type.type.name),
            firstMove: details.moves.length > 0 ? details.moves[0].move.name : 'No moves available',
            secondMove: move,

          };
        });

        const pokemonWithDetails = await Promise.all(pokemonDetailsPromises);

        setAllPokemon(pokemonWithDetails);
        setPokemon(pokemonWithDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
        setError(`Error fetching Pokemon data: ${error.message}`);
        setLoading(false);
      }
    };


    fetchPokemonData();
  }, []);

  useEffect(() => {
    const filteredPokemon = allPokemon.filter((pokeData) =>
      pokeData.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setPokemon(filteredPokemon);
  }, [searchKeyword, allPokemon]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;

  }

  return (
    <Container>
      <Row className="justify-content-center">
        {pokemon.map((pokeData, index) => (
          <CardComp
            key={index}
            name={capitalizeFirstLetter(pokeData.name)}
            imageUrl={pokeData.imageUrl}
            types={capitalizeFirstLetter(pokeData.types.join(" / "))}
            firstMove={capitalizeFirstLetter(pokeData.firstMove ? pokeData.firstMove.replace(/-/g, ' ') : 'No Move')}
            secondMove={capitalizeFirstLetter(pokeData.secondMove ? pokeData.secondMove.replace(/-/g, ' ') : 'No Move')}
          />
        ))}

      </Row>
    </Container>
  );
}

export default Pokemon;
