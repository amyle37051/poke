import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Skeleton from "./components/ui/Skeleton";

function RenderPoke() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [pokemon, setPokemon] = useState<string | null>(null);
    const [image, setImage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [pokemonNumber, setPokemonNumber] = useState<number | null>(null);

    const { data, isLoading, error } = useQuery(
      ['pokemon', pokemonNumber], // Unique cache key
      () =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
          .then((res) => res.json()),
      { enabled: !!pokemonNumber } // Fetch only if pokemonNumber is set
    );
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!selectedDate) {
        setError('Please select a valid birthdate');
        return;
      }

      const dd = selectedDate.getDate().toString();
      const mm = (selectedDate.getMonth() + 1).toString();
      const yy = selectedDate.getFullYear().toString().slice(-2);

      const calculatedNumber = parseInt(dd.slice(-1) + mm.slice(-1) + yy.slice(-1));
      setPokemonNumber(calculatedNumber); // Trigger data fetch
      setError('');
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
          <button type="submit">Find my Pokemon</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading ? (
          <div className="skeleton-container">
            <Skeleton className="skeleton" />
          </div>
        ) : (
          pokemon && (
            <div>
              <h2>You are: {pokemon}</h2>
              {image && <img src={image} alt={pokemon} />}
            </div>
          )
        )}
      </div>
    );
  }
  
  export default RenderPoke;