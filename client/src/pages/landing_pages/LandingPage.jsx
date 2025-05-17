import React from 'react';
import { Box, Container } from '@mui/material';
import Header from '../../components/landing/Header';
import Slider from '../../components/landing/Slider';
import AboutSection from '../../components/landing/AboutSection';
import ServicesSection from '../../components/landing/ServicesSection';
import TeamSection from '../../components/landing/TeamSection';
import PricingSection from '../../components/landing/PricingSection';
import GallerySection from '../../components/landing/GallerySection';
import CutDetailsSection from '../../components/landing/CutDetailsSection';
import BlogSection from '../../components/landing/BlogSection';
import Footer from '../../components/landing/Footer';
import SplashCursor from '../../components/landing/SplashCursor';

function LandingPage() {
  return (
    <>
      <SplashCursor />
      <Header />
      <Slider />
      <Container maxWidth="lg">
        <Box sx={{ my: 5 }}>
          <AboutSection />
        </Box>
        <Box sx={{ my: 5 }}>
          <ServicesSection />
        </Box>
        <Box sx={{ my: 5 }}>
          <TeamSection />
        </Box>
        <Box sx={{ my: 5 }}>
          <PricingSection />
        </Box>
        <Box sx={{ my: 5 }}>
          <GallerySection />
        </Box>
        <Box sx={{ my: 5 }}>
          <CutDetailsSection />
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default LandingPage;
