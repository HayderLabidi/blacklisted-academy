
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const ComingSoonBanner = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={cn(
        "fixed top-0 left-0 right-0 z-[60] bg-black text-white py-1 text-center transition-all duration-500 transform",
        visible ? "translate-y-0" : "-translate-y-full"
      )}
      style={{ marginTop: visible ? "0" : "-40px" }}
    >
      <div className="container mx-auto px-4">
        <p className="text-sm md:text-base font-medium">
          <span className="font-bold">Coming Soon:</span> Premium Trading Courses & Signals. <a href="#signup" className="underline hover:text-gray-300 transition-colors">Join the waitlist →</a>
        </p>
      </div>
    </div>
  );
};

export default ComingSoonBanner;
