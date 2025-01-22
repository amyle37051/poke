import React from "react";
import { useQuery } from "@tanstack/react-query"; // React Query for data fetching

function GenOne() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["genOnePokemon"],
        queryFn: async () => {
            const response = await fetch("https://pokeapi.co/api/v2/generation/1"),
            if (!response.ok) {
                throw new Error("Failed to fetch Pokemon data");
            }
            return response.json();
        },
    });
    if (isLoading) return <p>Is Loading...</p>;
    if (error) return <p>Could not load page</p>;

    return (
        <div>
            <h1>Generation 1 Pokémon</h1>
            <ul>
                {data.pokemon_species.map((pokemon: any) => (
                    <li key={pokemon.name}>{pokemon.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default GenOne;