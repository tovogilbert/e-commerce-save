import React from "react";
import Index from "./Index";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
