
import React, { useRef, useEffect } from 'react';
import { Trophy, Users, LineChart, BookOpen, SignalHigh, CalendarClock } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: "Comprehensive Courses",
    description: "Structured learning paths for traders at all levels, from fundamentals to advanced strategies."
  },
  {
    icon: SignalHigh,
    title: "Premium Signals",
    description: "Actionable trading opportunities with precise entry, target, and stop-loss levels."
  },
  {
    icon: Users,
    title: "Community Access",
    description: "Join a network of like-minded traders to share insights and strategies."
  },
  {
    icon: LineChart,
    title: "Market Analysis",
    description: "Regular market reviews and analysis of current trading conditions."
  },
  {
    icon: CalendarClock,
    title: "Live Webinars",
    description: "Weekly sessions with professional traders discussing strategies and market outlook."
  },
  {
    icon: Trophy,
    title: "Mentorship Program",
    description: "One-on-one guidance from experienced traders to accelerate your growth."
  }
];

const FeatureSection = () => {
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
    
    const elementsToObserve = sectionRef.current?.querySelectorAll('.feature-card');
    elementsToObserve?.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      elementsToObserve?.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="features" className="section-spacing" ref={sectionRef}>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-widest text-gray-600 mb-4">What We Offer</p>
          <h2 className="heading-lg mb-6">Trading Excellence</h2>
          <p className="text-lg text-gray-600 text-balance">
            Blacklisted Traders provides a complete ecosystem for traders to learn, grow, and succeed in the financial markets.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card bg-white rounded-xl p-6 border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 opacity-0"
            >
              <div className="flex flex-col h-full">
                <div className="mb-5">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100">
                    <feature.icon className="text-black" size={24} />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600 flex-grow">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
