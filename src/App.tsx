import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [pokemon, setPokemon] = useState<string | null>(null); // Use TypeScript types for state
  const [image, setImage] = useState<string>('');
  const [error, setError] = useState<string>('');

  //define event type for handleSubmit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //const birthDate = event.currentTarget.birthdate.value; //use currentTarget for form

    if (!selectedDate) {
      setError('Please select a valid birthdate');
      return;

    //extract dd, mm, yy from the selected Date
    const dd = selectedDate.getDate().toString();
    const mm = (selectedDate.getMonth() + 1).toString(); //months are 0-indexed
    const yy = selectedDate.getFullYear().toString().slice(-2); //last 2 digits of year

    //get last digits of ddmmyy and concatenate
    const pokemonNumber = parseInt(dd.slice(-1) + mm.slice(-1) + yy.slice(-1));

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data.name);
        setImage(data.sprites.front_default);
        setError(''); //clear previous errors
      })
      .catch(() => setError('Could not fetch Pokémon. Please try again.'));
  };

  return (
    <div>
      <h1>Which Pokemon are you?</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Select your birth date:
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)} //update state when date is selected
            dateFormat="dd-MM-yy" //format date as dd-mm-yy
            placeholderText="Click to select a date"
          />
        </label>
        <button type="submit">Find my Pokemon</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {pokemon && (
        <div>
          <h2>You are: {pokemon}</h2>
          {image && <img src={image} alt={pokemon} />}
        </div>
      )}
    </div>
  );
}

export default App;