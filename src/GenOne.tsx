import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query"; // React Query for data fetching

interface Pokemon {
    name: string;
    url: string;
}

function GenOne() {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]); // Explicitly typing as an array of Pokemon
    // const { data, isLoading, error } = useQuery({
    //     queryKey: ["genOnePokemon"],
    //     queryFn: async () => {
    //         const response = await fetch("https://pokeapi.co/api/v2/generation/1")
    //         if (!response.ok) {
    //             throw new Error("Failed to fetch Pokemon data");
    //         }
    //         return response.json();
    //     },
    // });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        //fetch all gen 1 pokemon = 151
        const fetchGenOne = async () => {
            try {
                const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
                const data = await response.json();
                setPokemonList(data.results); //store list of pokemon
                setIsLoading(false);
            }
            catch (error) {
                console.error("Failed to fetch Pokémon data:", error);
            }
        };

        fetchGenOne();
    }, []);


    return (
        <div>
            <h1>Generation 1 Pokémon</h1>
            {isLoading ? (
                <p>Loading Pokémon...</p>
            ) : (
                <div className="grid">
                    {pokemonList.map((pokemon, index) => (
                        <div className="grid-item" key={pokemon.name}>
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                                alt={pokemon.name}
                            />
                            <p>{`#${index + 1} ${pokemon.name}`}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

}

export default GenOne;