import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RenderPoke from "./RenderPoke"; // Move RenderPoke logic to its own component

//create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RenderPoke />
    </QueryClientProvider>
  );
}

export default App;
