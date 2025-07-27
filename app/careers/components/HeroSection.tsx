import { assetsDataMap } from '@/app/utils/assetsDataMap';
import React from 'react';

const HeroSection = () => (
  <section className="relative h-48 md:h-56 lg:h-64 flex items-center bg-[#2E3E95] overflow-hidden">
    {/* Background image */}
    <img src={assetsDataMap["Career-Banner"]} alt="Careers Hero" className="absolute inset-0 w-full h-full object-cover z-0" />
    {/* Blue gradient overlay: left (solid) to right (transparent) */}
    <div className="absolute inset-0 z-10" style={{background: 'linear-gradient(90deg, rgba(46,62,149,0.7) 0%, rgba(46,62,149,0.0) 100%)'}} />
    {/* Content */}
    <div className="relative z-20 flex items-center h-full px-6 md:px-12">
      <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-extrabold text-left">Careers</h1>
    </div>
  </section>
);

export default HeroSection; 