
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CourseSection from '@/components/CourseSection';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import SignalSection from '@/components/SignalSection';
import FeatureSection from '@/components/FeatureSection';


const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
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
