import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "What is the minimum investment required to start trading?",
    answer: "While there's no strict minimum, we recommend starting with at least $1,000 to properly implement risk management strategies and have enough capital to diversify your trades."
  },
  {
    question: "How long does it take to become a profitable trader?",
    answer: "The journey to becoming a profitable trader varies for each individual. With consistent practice and dedication, most traders start seeing positive results within 6-12 months of proper training and experience."
  },
  {
    question: "Do you offer refunds for your courses?",
    answer: "Yes, we offer a 30-day money-back guarantee for all our courses. If you're not satisfied with the content, you can request a full refund within 30 days of purchase."
  },
  {
    question: "What trading platforms do you recommend?",
    answer: "We recommend several reputable platforms including MetaTrader 4/5, TradingView, and cTrader. Each platform has its strengths, and we provide specific guidance on platform selection in our courses."
  },
  {
    question: "Do you provide ongoing support after course completion?",
    answer: "Yes, all our students get access to our private Discord community where they can interact with instructors and other traders, ask questions, and receive ongoing support."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="container-custom py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-gray-400">
            Find answers to common questions about our trading courses and services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-panel p-6 rounded-lg border border-white/10"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between text-left"
              >
                <h3 className="text-lg font-medium">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {openIndex === index && (
                <p className="mt-4 text-gray-400">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ; 