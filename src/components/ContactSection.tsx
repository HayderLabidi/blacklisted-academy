/* eslint-disable react-hooks/exhaustive-deps */

import React, { useRef, useEffect, useState } from 'react';
import { Send } from 'lucide-react';

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting:', { name, email });
    // In a real implementation, you would send this data to your backend
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-spacing bg-black" ref={sectionRef}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1  animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h2 className="heading-md mb-6">Join the Waitlist</h2>
              <p className="text-gray-600 mb-8">
                Be among the first to access our premium trading courses and signals when we launch. Enter your details below to join our waitlist.
              </p>
              
              {submitted ? (
                <div className="bg-black/5 p-6 rounded-xl text-center">
                  <h3 className="text-xl font-medium mb-2">Thank You!</h3>
                  <p className="text-gray-600">
                    You've been added to our waitlist. We'll contact you when we launch.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="glass-button w-full flex items-center justify-center space-x-2"
                  >
                    <span>Join Waitlist</span>
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
          
          <div className="order-1 lg:order-2  animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <p className="text-sm uppercase tracking-widest text-gray-600 mb-4">Stay Connected</p>
            <h2 className="heading-lg mb-6">Get Early Access</h2>
            <p className="text-lg text-gray-600 mb-8 text-balance">
              Our platform is launching soon with limited spots for our premium trading programs. Join our waitlist to secure your place.
            </p>
            
            <div className="space-y-8">
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 w-1 h-full bg-gray-200"></div>
                <div className="absolute left-0 top-0 w-1 h-1/3 bg-black"></div>
                <h3 className="text-xl font-medium mb-2">Exclusive Content</h3>
                <p className="text-gray-600">
                  Waitlist members receive exclusive educational content before our official launch.
                </p>
              </div>
              
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 w-1 h-full bg-gray-200"></div>
                <div className="absolute left-0 top-0 w-1 h-2/3 bg-black"></div>
                <h3 className="text-xl font-medium mb-2">Early Bird Pricing</h3>
                <p className="text-gray-600">
                  Special discounted rates for founding members who join from our waitlist.
                </p>
              </div>
              
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 w-1 h-full bg-gray-200"></div>
                <div className="absolute left-0 top-0 w-1 h-full bg-black"></div>
                <h3 className="text-xl font-medium mb-2">Priority Access</h3>
                <p className="text-gray-600">
                  First access to our premium courses, signals, and community when we launch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;