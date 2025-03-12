
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-3 bg-black/80 backdrop-blur-lg" : "py-5 bg-transparent"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img 
            src="/lovable-uploads/9492a47a-9b94-41db-a99e-ffbee53b1f61.png" 
            alt="Blacklisted Traders Logo" 
            className="h-8 w-auto"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#courses" className="font-medium text-white/80 hover:text-white transition-colors">
            Courses
          </a>
          <a href="#signals" className="font-medium text-white/80 hover:text-white transition-colors">
            Signals
          </a>
          <a href="#features" className="font-medium text-white/80 hover:text-white transition-colors">
            Features
          </a>
          <a href="#contact" className="font-medium text-white/80 hover:text-white transition-colors">
            Contact
          </a>
          <a href="#signup" className="glass-button">
            Sign Up
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white/80 hover:text-white focus:outline-none" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed inset-0 bg-black z-40 transform transition-transform duration-300 ease-in-out md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ top: '60px' }}
      >
        <nav className="flex flex-col p-8 space-y-8">
          <a 
            href="#courses" 
            className="font-medium text-xl text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Courses
          </a>
          <a 
            href="#signals" 
            className="font-medium text-xl text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Signals
          </a>
          <a 
            href="#features" 
            className="font-medium text-xl text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href="#contact" 
            className="font-medium text-xl text-white/80 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>
          <a 
            href="#signup" 
            className="glass-button w-full text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign Up
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
