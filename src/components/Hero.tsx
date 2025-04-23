import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="text-center my-12 md:my-16 lg:my-20">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
        <span className="block">Search Over 12 millions+</span>
        <span className="block">Trademarks for free</span>
      </h2>
      <div className="mt-6 space-y-1">
        <p className="text-lg md:text-xl text-gray-700">The worlds most trusted company</p>
        <p className="text-lg md:text-xl text-gray-700">Our best trademark filling</p>
      </div>
    </div>
  );
};

export default Hero;