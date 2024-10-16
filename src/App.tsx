import { useState } from 'react';
import './App.css';

function App() {
  const [pokemon, setPokemon] = useState<string | null>(null); // Use TypeScript types for state
  const [image, setImage] = useState<string>('');
  const [error, setError] = useState<string>('');

  //define event type for handleSubmit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const birthDate = event.currentTarget.birthdate.value; //use currentTarget for form

    if (!birthDate.match(/^\d{2}-\d{2}-\d{2}$/)) {
      setError('Invalid birthdate');
      return;
    }

    const [dd, mm, yy] = birthDate.split('-');

    //get last digits of dd, mm, yy
    const pokemonNumber = parseInt(dd[1] + mm[1] + yy[1]);

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
          Enter your birth date (dd-mm-yy):
          <input type="text" name="birthdate" placeholder="dd-mm-yy" />
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
