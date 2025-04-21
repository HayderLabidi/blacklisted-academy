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
          ? "py-3 bg-white shadow-md"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img src="/lovable-uploads/logo-blt.png" className="h-10 w-auto" />
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-codecademy-purple-darkest">BLACKLISTED</span>
            <span className="text-codecademy-gray"> TRADERS</span>
          </h1>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {!isAuthenticated && (
            <>
              <button
                onClick={() => navigate('/courses')}
                className="font-medium text-codecademy-gray hover:text-codecademy-purple transition-colors"
              >
                Courses
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="font-medium text-codecademy-gray hover:text-codecademy-purple transition-colors"
              >
                Contact
              </button>
              <button
                onClick={() => navigate('/faq')}
                className="font-medium text-codecademy-gray hover:text-codecademy-purple transition-colors"
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
          className="md:hidden text-codecademy-gray hover:text-codecademy-purple focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 bg-white transform transition-transform duration-300 ease-in-out md:hidden",
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
                className="font-medium text-xl text-codecademy-gray hover:text-codecademy-purple transition-colors text-left"
              >
                Courses
              </button>
              <button
                onClick={() => {
                  navigate('/contact');
                  setIsMenuOpen(false);
                }}
                className="font-medium text-xl text-codecademy-gray hover:text-codecademy-purple transition-colors text-left"
              >
                Contact
              </button>
              <button
                onClick={() => {
                  navigate('/faq');
                  setIsMenuOpen(false);
                }}
                className="font-medium text-xl text-codecademy-gray hover:text-codecademy-purple transition-colors text-left"
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
