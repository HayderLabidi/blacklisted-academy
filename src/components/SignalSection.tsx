/* eslint-disable react-hooks/exhaustive-deps */

import React, { useRef, useEffect } from 'react';
import { Signal, TrendingUp, Clock, BarChart3 } from 'lucide-react';

const SignalSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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

  return (
    <section id="signals" className="section-spacing bg-black text-white" ref={sectionRef}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1  animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">Real-Time Trading</p>
            <h2 className="heading-lg mb-6">Expert Trading Signals</h2>
            <p className="text-lg text-gray-300 mb-8 text-balance">
              Receive precise trading signals from our team of experienced traders, complete with entry points, targets, and stop-loss levels.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <TrendingUp size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">High-Probability Setups</h3>
                  <p className="text-gray-400">Carefully analyzed trades with clear risk-to-reward ratios</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <Clock size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Real-Time Alerts</h3>
                  <p className="text-gray-400">Instant notifications for time-sensitive trading opportunities</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <BarChart3 size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Detailed Analysis</h3>
                  <p className="text-gray-400">Complete breakdowns of market conditions and setup rationale</p>
                </div>
              </div>
            </div>
            
            <a href="#signup" className="inline-block glass-button bg-white/10 hover:bg-white/20">
              Get Early Access
            </a>
          </div>
          
          <div className="order-1 lg:order-2 relative  animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="aspect-square relative z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
              
              <div className="relative z-20 h-full flex items-center justify-center">
                <div className="glass-panel-dark p-6 w-full max-w-md">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Signal size={18} className="text-white" />
                      <span className="font-medium">New Signal</span>
                    </div>
                    <span className="text-xs bg-white/10 px-2 py-1 rounded-full">5m ago</span>
                  </div>
                  
                  <div className="space-y-4 mb-4">
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">BTC/USD</span>
                        <span className="text-green-400">BUY</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        <div className="flex justify-between mb-1">
                          <span>Entry:</span>
                          <span className="text-white">$46,800 - $47,200</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Target:</span>
                          <span className="text-white">$51,500</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Stop Loss:</span>
                          <span className="text-white">$44,500</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 p-3 rounded-lg">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">EUR/USD</span>
                        <span className="text-red-400">SELL</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        <div className="flex justify-between mb-1">
                          <span>Entry:</span>
                          <span className="text-white">1.0820 - 1.0835</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Target:</span>
                          <span className="text-white">1.0760</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Stop Loss:</span>
                          <span className="text-white">1.0870</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <a href="#" className="text-center block w-full py-2 bg-white/10 rounded-lg text-sm transition-colors hover:bg-white/20">
                    View All Signals
                  </a>
                </div>
              </div>
            </div>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white/5 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignalSection;
