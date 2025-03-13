import React from 'react';
import Navbar from '@/components/Navbar';

const Contact = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <Navbar />
      <section id="contact" className="section-spacing">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="glass-panel p-8 rounded-2xl border border-white/10">
                <h2 className="text-3xl font-bold mb-6">Join the Waitlist</h2>
                <p className="text-gray-400 mb-8">
                  Be among the first to access our premium trading courses and signals when we launch. Enter your details below to join our waitlist.
                </p>
                
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tell us about your trading experience or any questions you have"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="glass-button w-full"
                  >
                    Join Waitlist
                  </button>
                </form>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">Stay Connected</p>
              <h2 className="text-3xl font-bold mb-6">Get Early Access</h2>
              <p className="text-lg text-gray-400 mb-8 text-balance">
                Our platform is launching soon with limited spots for our premium trading programs. Join our waitlist to secure your place.
              </p>
              
              <div className="space-y-8">
                <div className="relative pl-8">
                  <div className="absolute left-0 top-0 w-1 h-full bg-white/10"></div>
                  <div className="absolute left-0 top-0 w-1 h-1/3 bg-blue-500"></div>
                  <h3 className="text-xl font-medium mb-2">Exclusive Content</h3>
                  <p className="text-gray-400">
                    Waitlist members receive exclusive educational content before our official launch.
                  </p>
                </div>
                
                <div className="relative pl-8">
                  <div className="absolute left-0 top-0 w-1 h-full bg-white/10"></div>
                  <div className="absolute left-0 top-0 w-1 h-2/3 bg-blue-500"></div>
                  <h3 className="text-xl font-medium mb-2">Early Bird Pricing</h3>
                  <p className="text-gray-400">
                    Special discounted rates for founding members who join from our waitlist.
                  </p>
                </div>
                
                <div className="relative pl-8">
                  <div className="absolute left-0 top-0 w-1 h-full bg-white/10"></div>
                  <div className="absolute left-0 top-0 w-1 h-full bg-blue-500"></div>
                  <h3 className="text-xl font-medium mb-2">Priority Access</h3>
                  <p className="text-gray-400">
                    First access to our premium courses, signals, and community when we launch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 