import { assetsDataMap } from '@/app/utils/assetsDataMap';
import React from 'react';

const avatars = [
  assetsDataMap["Career-Person1"],
  assetsDataMap["Career-Person2"],
  assetsDataMap["Career-Person3"],
  assetsDataMap["Career-Person4"],
  assetsDataMap["Career-Person5"],
];

const ExpertBrains = () => (
  <section className="pt-4 pb-2 flex flex-col items-center w-full relative">
    {/* Top blue line */}
    <div className="absolute top-0 left-0 w-full h-1 bg-[#56B9F0]" />
    <div className="flex flex-col md:flex-row items-center gap-2 mt-4 mb-2 w-full justify-center">
      <div className="flex flex-row justify-center gap-0 mb-2 md:mb-0 ">
        {avatars.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Expert ${idx + 1}`}
            className={`w-16 h-16 rounded-full object-cover border-2 border-white shadow ${idx !== 0 ? '-ml-5' : ''
              }`}
            style={{ background: '#eee' }}
          />
        ))}
      </div>
      <span className="md:ml-3 text-xl font-medium text-center md:text-left" style={{ color: '#2E3E95' }}>
        Join 50+ Expert Brains
      </span>
    </div>
  </section>
);

export default ExpertBrains; 