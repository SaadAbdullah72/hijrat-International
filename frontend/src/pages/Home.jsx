import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import FeaturedPackages from '../components/FeaturedPackages';
import AboutSection from '../components/AboutSection';

const Home = () => {
  return (
    <main>
      <Hero />
      <Services />
      <AboutSection />
      <FeaturedPackages />
      {/* Add more sections like Testimonials or Brand Logos here */}
    </main>
  );
};

export default Home;
