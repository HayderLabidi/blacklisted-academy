
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ComingSoonBanner from '@/components/ComingSoonBanner';
import HeroSection from '@/components/HeroSection';
import CourseSection from '@/components/CourseSection';
import SignalSection from '@/components/SignalSection';
import FeatureSection from '@/components/FeatureSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  // Add top padding to account for the coming soon banner
  useEffect(() => {
    const body = document.body;
    body.style.paddingTop = '30px';
    
    return () => {
      body.style.paddingTop = '0';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <ComingSoonBanner />
      <Navbar />
      <main>
        <HeroSection />
        <CourseSection />
        <SignalSection />
        <FeatureSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
