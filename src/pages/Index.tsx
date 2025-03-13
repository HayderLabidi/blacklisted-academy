import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import SignalSection from '@/components/SignalSection';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        {!isAuthenticated && (
            <SignalSection />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
