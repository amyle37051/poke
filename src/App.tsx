import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RenderPoke from "./RenderPoke"; //move RenderPoke to its own file
import GenOne from "./GenOne";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


//create a client
const queryClient = new QueryClient();

function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to Pokémon Finder</h1>
      <Link to="/find-pokemon">
        <button>Find My Pokémon</button>
      </Link>
      <Link to="/gen-one">
        <button>Generation 1 Pokemons</button>
      </Link>
    </div>
  );
}


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Home Page */}
          <Route path="/find-pokemon" element={<RenderPoke />} /> {/* Pokémon Finder */}
          <Route path="/gen-one" element={<GenOne />} /> {/* 1st gen */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
