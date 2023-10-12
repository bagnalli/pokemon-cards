import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import CardComp from "./CardComp";

function Pokemon() {
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

        // Fetch additional details for each Pokémon
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
              (entry) => entry.language.name === "en" // You can change the language as needed
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

        setPokemon(pokemonWithDetails);
        setLoading(false);
      } catch (error) {
        setError("Error fetching Pokemon data.");
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

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
            name={pokeData.name}
            imageUrl={pokeData.imageUrl}
            types={pokeData.types}
            description={pokeData.description}
          />
        ))}
      </Row>
    </Container>
  );
}

export default Pokemon;
