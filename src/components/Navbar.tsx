import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuthClick = () => {
    if (isAuthenticated) {
      signOut();
    } else {
      navigate('/sign-in');
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "py-3 bg-black shadow-lg md:bg-black/80 md:backdrop-blur-lg"
          : "py-5 bg-black md:bg-black/90 md:backdrop-blur-md"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img src="/lovable-uploads/logo-blt.png" className="h-10 w-auto" />
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-white">BLACKLISTED</span>
            <span className="text-gray-300"> TRADERS</span>
          </h1>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {!isAuthenticated && (
            <>
              <button
                onClick={() => navigate('/courses')}
                className="font-medium text-gray-300 hover:text-white transition-colors"
              >
                Courses
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="font-medium text-gray-300 hover:text-white transition-colors"
              >
                Contact
              </button>
              <button
                onClick={() => navigate('/faq')}
                className="font-medium text-gray-300 hover:text-white transition-colors"
              >
                FAQ
              </button>
            </>
          )}
          <button onClick={handleAuthClick} className="glass-button">
            {isAuthenticated ? 'Sign Out' : 'Sign In'}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
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
        style={{ top: "60px" }}
      >
        <nav className="flex flex-col p-8 space-y-8">
          {!isAuthenticated && (
            <>
              <button
                onClick={() => {
                  navigate('/courses');
                  setIsMenuOpen(false);
                }}
                className="font-medium text-xl text-gray-300 hover:text-white transition-colors text-left"
              >
                Courses
              </button>
              <button
                onClick={() => {
                  navigate('/contact');
                  setIsMenuOpen(false);
                }}
                className="font-medium text-xl text-gray-300 hover:text-white transition-colors text-left"
              >
                Contact
              </button>
              <button
                onClick={() => {
                  navigate('/faq');
                  setIsMenuOpen(false);
                }}
                className="font-medium text-xl text-gray-300 hover:text-white transition-colors text-left"
              >
                FAQ
              </button>
            </>
          )}
          <button
            onClick={() => {
              handleAuthClick();
              setIsMenuOpen(false);
            }}
            className="glass-button w-full text-center"
          >
            {isAuthenticated ? 'Sign Out' : 'Sign In'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
