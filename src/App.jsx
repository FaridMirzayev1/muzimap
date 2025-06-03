import { useEffect, useState } from "react";

import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Contact from "./components/Contact";
import Premium from "./components/Premium";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Playlists from "./pages/Playlists";

export default function App() {

  useEffect(() => {
    fetch('https://muzimap.svdev.me/spotify-token')
    .then((response) => response.json())
    .then(x => localStorage.setItem('spotify-token', x.access_token))
  }, []);

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/aboutus" element={<AboutUs/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/playlists" element={<Playlists/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
