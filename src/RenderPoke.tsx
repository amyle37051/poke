import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Skeleton from "./components/ui/Skeleton";
import { useQuery } from "@tanstack/react-query";

function RenderPoke() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [pokemon, setPokemon] = useState<string | null>(null);
  const [image, setImage] = useState<string>("");
  const [errorMessage, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [pokemonNumber, setPokemonNumber] = useState<number | null>(null);


  const { data, isLoading, error } = useQuery(
    ["pokemon", pokemonNumber], // Query key
    async () => {
      if (!pokemonNumber) throw new Error("No Pokémon number");
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
      return response.json();
    },
    { enabled: !!pokemonNumber } // Configuration as second argument
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedDate) {
      setError("Please select a valid birthdate");
      return;
    }

    const dd = selectedDate.getDate().toString();
    const mm = (selectedDate.getMonth() + 1).toString();
    const yy = selectedDate.getFullYear().toString().slice(-2);

    const calculatedNumber = parseInt(
      dd.slice(-1) + mm.slice(-1) + yy.slice(-1)
    );
    setPokemonNumber(calculatedNumber); // Trigger data fetch
    setError("");
  };

  return (
    <div>
      <h1>Which Pokemon are you?</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Select your birth date:
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            dateFormat="dd-MM-yy"
            placeholderText="Click to select a date"
          />
        </label>
        <button type="submit">Find my Pokémon</button>
      </form>
      {error && <p style={{ color: 'red' }}>Could not fetch Pokémon. Please try again.</p>}
      {isLoading ? (
        <div className="skeleton-container">
          <Skeleton className="skeleton" />
        </div>
      ) : (
        data && (
          <div>
            <h2>You are: {data.name}</h2>
            {data.sprites.front_default && (
              <img src={data.sprites.front_default} alt={data.name} />
            )}
          </div>
        )
      )}
    </div>
  );
}

export default RenderPoke;
