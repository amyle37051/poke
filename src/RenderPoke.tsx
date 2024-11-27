import React, { useState } from "react";
import DatePicker from "react-datepicker"; // For date selection
import "react-datepicker/dist/react-datepicker.css"; // Styles for the date picker
import { useQuery } from "@tanstack/react-query"; // React Query for data fetching
import Skeleton from "./components/ui/Skeleton"; // Loading state component

// // Define the shape of Pokémon data from the API
// interface PokemonData {
//   name: string;
//   sprites: {
//     front_default: string;
//   };
// }

function RenderPoke() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Tracks the selected date
  const [errorMessage, setError] = useState<string>(""); // Error messages for form validation
  const [pokemonNumber, setPokemonNumber] = useState<number | null>(null); // Pokémon number for API request

  //could i use this instead
  const { data, isLoading, error } = useQuery({  
    queryKey: ["pokemon", pokemonNumber], //query key
    queryFn: async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon data");
      }
      return response.json(); // Ensure the response is returned as JSON
    },
    enabled: pokemonNumber !== null, // Fetch only if pokemonNumber is set
  });


  // Fetch Pokémon data using React Query
  // const { data, isLoading, error } = useQuery<PokemonData>(
  //   ["pokemon", pokemonNumber], // Query key
  //   async () => {
  //     if (!pokemonNumber) throw new Error("No Pokémon number");
  //     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
  //     if (!response.ok) throw new Error("Failed to fetch Pokémon data");
  //     return response.json(); // Ensure correct type
  //   },
  //   {
  //     enabled: !!pokemonNumber, // Fetch only if pokemonNumber is set
  //   }
  // );

  // Handle form submission to calculate Pokémon number
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form reload

    if (!selectedDate) {
      setError("Please select a valid birthdate"); // Error for missing date
      return;
    }

    // Extract last digits of day, month, and year
    const dd = selectedDate.getDate().toString();
    const mm = (selectedDate.getMonth() + 1).toString(); // Month is zero-indexed
    const yy = selectedDate.getFullYear().toString().slice(-2);

    // Calculate Pokémon number by concatenating last digits
    const calculatedNumber = parseInt(
      dd.slice(-1) + mm.slice(-1) + yy.slice(-1)
    );
    setPokemonNumber(calculatedNumber); // Update state to trigger query
    setError(""); // Clear any previous error
  };

  return (
    <div>
      <h1>Which Pokémon are you?</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Select your birth date:
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)} // Update state on date change
            dateFormat="dd-MM-yy" // Desired date format
            placeholderText="Click to select a date" // Input placeholder
          />
        </label>
        <button type="submit">Find my Pokémon</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Show form errors */}
      {isLoading ? (
        <div className="skeleton-container">
          <Skeleton className="skeleton" /> {/* Loading state */}
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>Could not fetch Pokémon. Please try again.</p> 
      ) : (
        data && (
          <div>
            <h2>You are: {data.name}</h2> {/* Pokémon name */}
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
