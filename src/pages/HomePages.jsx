import React from 'react';
import NavbarTop from '../components/NavbarTop';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FooterSection from '../components/FooterSection';
import TeamSection from '../components/TeamSection';

const HomePages = () => {
  document.title = 'Homepages';
  return (
    <div>
      <NavbarTop />
      <HeroSection />
      <AboutSection />
      <TeamSection />
      <FooterSection />
    </div>
  );
};

export default HomePages;
