import React, { useState } from 'react';
import fish from '../../assets/img/fish.jpg'

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase. Items must be unused and in original packaging."
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping typically takes 3-5 business days for domestic orders."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we offer international shipping to select countries."
    },
    {
      question: "Can I track my order?",
      answer: "Yes, you will receive a tracking number via email once your order has shipped."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers."
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
 <div>

<div
                className="hero min-h-60 bg-fixed"
                style={{
                    backgroundImage: `url(${fish})`,
                }}>
                <div className="hero-overlay bg-[#9c1a34] bg-opacity-80"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="">
                        <h1 className="mb-5 text-5xl font-bold">FAQ</h1>
                    </div>
                </div>
            </div>
       <div className="  md:w-[80%] mx-auto mt-16 p-6">


        
<h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
<div className="space-y-4">
  {faqs.map((faq, index) => (
    <div key={index}>
      <div
        className="flex justify-between items-center cursor-pointer p-4  border border-black transition duration-300"
        onClick={() => toggleFAQ(index)}
      >
        <h3 className="text-lg font-semibold">{faq.question}</h3>
        <span className={`transition transform ${activeIndex === index ? 'rotate-180' : 'rotate-0'}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 15.5l6-6H6z" />
          </svg>
        </span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-1000 ease-in-out ${activeIndex === index ? 'max-h-screen' : 'max-h-0'}`}
      >
        <p className="mt-2 p-4  d">   <h6 className='font-bold'>Answer:</h6> {faq.answer}</p>
      </div>
    </div>
  ))}
</div>
</div>
 </div>
  );
};

export default Faq;
