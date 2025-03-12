import React, { useRef, useEffect } from 'react';

// Paths to images in the public folder
const Professor1Logo = "/lovable-uploads/ibrahim.png";
const Professor2Logo = "/lovable-uploads/hmzed.png";
const Professor3Logo = "/lovable-uploads/motaz.png";
const Professor4Logo = "/lovable-uploads/timesta.png";
const Professor5Logo = "/lovable-uploads/yassin.png";
const Professor6Logo = "/lovable-uploads/spayzer.png";

const features = [
  {
    id: 1,
    name: "John Doe",
    role: "Senior Trading Analyst",
    description: "With over 10 years of experience, John specializes in technical analysis and risk management.",
    logo: Professor1Logo,
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Market Strategist",
    description: "Jane is an expert in macroeconomic trends and their impact on financial markets.",
    logo: Professor2Logo,
  },
  {
    id: 3,
    name: "Alex Johnson",
    role: "Algorithmic Trading Expert",
    description: "Alex develops advanced trading algorithms and automated strategies.",
    logo: Professor3Logo,
  },
  {
    id: 4,
    name: "Emily Brown",
    role: "Trading Psychologist",
    description: "Emily helps traders overcome psychological barriers and improve decision-making.",
    logo: Professor4Logo,
  },
  {
    id: 5,
    name: "Michael Lee",
    role: "Options Trading Specialist",
    description: "Michael is a seasoned options trader with a focus on volatility strategies.",
    logo: Professor5Logo,
  },
  {
    id: 6,
    name: "Sarah Wilson",
    role: "Cryptocurrency Analyst",
    description: "Sarah provides insights into the fast-evolving world of cryptocurrencies.",
    logo: Professor6Logo,
  },
];

const FeatureSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    const elementsToObserve = sectionRef.current?.querySelectorAll('.feature-card');
    elementsToObserve?.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elementsToObserve?.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="features" className="section-spacing bg-gray-200" ref={sectionRef}>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-widest text-black mb-4">Our Team</p>
          <h2 className="heading-lg mb-6 text-black">Meet Our Professors</h2>
          <p className="text-lg text-black text-balance">
            Our team of experienced professionals is dedicated to helping you succeed in the financial markets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {features.map((feature) => (
            <div
              key={feature.id}
              className="feature-card bg-white rounded-xl p-6 border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex flex-col h-full">
                <div className="mb-5">
                  <img
                    src={feature.logo}
                    alt={`${feature.name}'s logo`}
                    className="w-24 h-24 rounded-full object-cover mx-auto"
                  />
                </div>

                <h3 className="text-xl font-semibold mb-2 text-center">{feature.name}</h3>
                <p className="text-sm text-gray-600 text-center mb-4">{feature.role}</p>
                <p className="text-gray-600 text-center flex-grow">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;