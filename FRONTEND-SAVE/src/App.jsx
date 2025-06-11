import React from "react";
import Index from "./Index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
