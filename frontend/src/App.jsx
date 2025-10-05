import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./index.css";
import DonateFood from "./pages/DonateFood";
import BrowseFood from "./pages/BrowseFood";
import ClaimedFood from "./pages/ClaimedFood";
// Example placeholder pages
const Home = () => <h1 className="p-6">Welcome to FoodShare</h1>;
const About = () => <h1 className="p-6">About Us</h1>;
const Contact = () => <h1 className="p-6">Contact Page</h1>;
// const Login = () => <h1 className="p-6">Login Page</h1>;
// const Register = () => <h1 className="p-6">Register Page</h1>;
// const Donate = () => <h1 className="p-6">Donate Food Page</h1>;
const MyPosts = () => <h1 className="p-6">My Posts</h1>;
// const Browse = () => <h1 className="p-6">Browse Food</h1>;
// const Claimed = () => <h1 className="p-6">Claimed Food</h1>;

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
