import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "py-3 bg-white/80 backdrop-blur-lg shadow-sm"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img src="/lovable-uploads/logo-blt.png" className="h-10 w-auto" />
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-white">BLACKLISTED</span>
            <span className="text-gray-200"> TRADERS</span>
          </h1>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#courses"
            className="font-medium text-gray-700 hover:text-black transition-colors"
          >
            Courses
          </a>
          <a
            href="#signals"
            className="font-medium text-gray-700 hover:text-black transition-colors"
          >
            Signals
          </a>
          <a
            href="#features"
            className="font-medium text-gray-700 hover:text-black transition-colors"
          >
            Features
          </a>
          <a
            href="#contact"
            className="font-medium text-gray-700 hover:text-black transition-colors"
          >
            Contact
          </a>
          <a href="#signup" className="glass-button">
            Sign Up
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-black focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out md:hidden",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ top: "60px" }}
      >
        <nav className="flex flex-col p-8 space-y-8">
          <a
            href="#courses"
            className="font-medium text-xl text-gray-700 hover:text-black transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Courses
          </a>
          <a
            href="#signals"
            className="font-medium text-xl text-gray-700 hover:text-black transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Signals
          </a>
          <a
            href="#features"
            className="font-medium text-xl text-gray-700 hover:text-black transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#contact"
            className="font-medium text-xl text-gray-700 hover:text-black transition-colors"
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
