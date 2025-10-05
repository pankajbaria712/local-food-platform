import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./index.css";
import DonateFood from "./pages/DonateFood";
import BrowseFood from "./pages/BrowseFood";
import ClaimedFood from "./pages/ClaimedFood";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyPosts from "./pages/MyPosts";

function App() {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/donate" element={<DonateFood />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/browse" element={<BrowseFood />} />
        <Route path="/claimed" element={<ClaimedFood />} />
      </Routes>
    </div>
  );
}

export default App;
