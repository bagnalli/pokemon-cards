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
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=151`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon data.");
        }
        const data = await response.json();

        const pokemonWithDetails = await Promise.all(
          data.results.map(async (pokeData) => {
            const response = await fetch(pokeData.url);
            if (!response.ok) {
              throw new Error(`Failed to fetch data for ${pokeData.name}`);
            }
            const details = await response.json();
            const descriptionResponse = await fetch(details.species.url);
            if (!descriptionResponse.ok) {
              throw new Error(
                `Failed to fetch description for ${pokeData.name}`
              );
            }
            const descriptionData = await descriptionResponse.json();
            const description = descriptionData.flavor_text_entries.find(
              (entry) => entry.language.name === "en"
            );

            return {
              name: pokeData.name,
              imageUrl: details.sprites.front_default,
              types: details.types.map((type) => type.type.name),
              description: description
                ? description.flavor_text
                : "No description available",
            };
          })
        );

        setAllPokemon(pokemonWithDetails);
        setPokemon(pokemonWithDetails);
        setLoading(false);
      } catch (error) {
        setError("Error fetching Pokemon data.");
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
    return <p>{error}</p>;
  }

  return (
    <Container>
      <Row>
        {pokemon.map((pokeData, index) => (
          <CardComp
            key={index}
            name={capitalizeFirstLetter(pokeData.name)}
            imageUrl={pokeData.imageUrl}
            types={capitalizeFirstLetter(pokeData.types.join(" / "))}
            description={pokeData.description}
          />
        ))}
      </Row>
    </Container>
  );
}

export default Pokemon;
