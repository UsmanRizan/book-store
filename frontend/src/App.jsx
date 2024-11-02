import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CreateBook from "./pages/CreateBook.jsx";
import EditBook from "./pages/EditBook.jsx";
import DeleteBook from "./pages/DeleteBook.jsx";
import ShowBook from "./pages/ShowBook.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateBook />} />
      <Route path="/edit/:id" element={<EditBook />} />
      <Route path="/delete/:id" element={<DeleteBook />} />
      <Route path="/show/:id" element={<ShowBook />} />
    </Routes>
  );
};

export default App;
