import React from 'react';
import '../App.css';
import Navbar from "../components/Navbar";
import Footer from "../components/footer"
import HeroSection from '../components/HeroSection';

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Footer />
    </>
  );
}

export default Home;
