
import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      },
      {
        threshold: 0.1,
      }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center pt-24 pb-12 bg-codecademy-gray-light" ref={heroRef}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="staggered-fade-in space-y-8 order-2 lg:order-1">
            <div>
              <h1 className="heading-xl mb-6 text-codecademy-purple-darkest">
                <span className="block">Master The Markets</span>
                <span className="block">With <span className="text-codecademy-purple">Blacklisted</span> Traders</span>
              </h1>
              <p className="text-lg md:text-xl text-codecademy-gray max-w-lg text-balance">
                Expert-led courses, real-time signals, and comprehensive trading strategies designed for traders of all levels.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#signup" className="glass-button text-center">
                Join Waitlist
              </a>
              <a href="#courses" className="glass-button-outline text-center">
                Explore Courses
              </a>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-codecademy-purple border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-codecademy-purple-dark border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-codecademy-purple-darker border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-codecademy-purple-darkest border-2 border-white flex items-center justify-center text-white text-xs">+42</div>
              </div>
              <p className="text-sm text-codecademy-gray">Traders already joined</p>
            </div>
          </div>
          
          <div className="relative order-1 lg:order-2">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-xl animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-codecademy-purple-light/20 to-transparent"></div>
              <div className="grid grid-cols-2 grid-rows-2 gap-0.5 h-full w-full p-4">
                <div className="bg-codecademy-gray-light rounded-lg"></div>
                <div className="bg-codecademy-gray-light rounded-lg flex items-center justify-center">
                  <div className="w-3/4 h-1/2 bg-codecademy-purple/10 rounded"></div>
                </div>
                <div className="bg-codecademy-gray-light rounded-lg flex items-end p-2">
                  <div className="w-full h-1/3 flex space-x-1">
                    <div className="flex-1 bg-green-500/20 rounded"></div>
                    <div className="flex-1 bg-red-500/20 rounded"></div>
                  </div>
                </div>
                <div className="bg-codecademy-gray-light rounded-lg"></div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 glass-panel animate-slide-in-right py-4 px-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="font-medium text-codecademy-purple-darkest">Live Signals Active</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-16">
          <a 
            href="#courses" 
            className="flex flex-col items-center text-codecademy-gray hover:text-codecademy-purple transition-colors animate-float"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDown size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
