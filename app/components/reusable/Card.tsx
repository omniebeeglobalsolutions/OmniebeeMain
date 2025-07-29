'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { assetsDataMap } from '@/app/utils/assetsDataMap';

const allTechStackItems = [
  { src: assetsDataMap["reactjs-logo"], label: 'React.js' },
  { src: assetsDataMap["nextjs-logo"], label: 'Next.js' },
  { src: assetsDataMap["vuejs-logo"], label: 'Vue.js' },
  { src: assetsDataMap["js-logo"], label: 'JavaScript' },
  { src: assetsDataMap["automation-logo"], label: 'Automation' },
  { src: assetsDataMap["cloud-logo"], label: 'Cloud' },
  { src: assetsDataMap["nodejs-logo"], label: 'Node.js' },
  { src: assetsDataMap["expressjs-logo"], label: 'Express.js' },
  { src: assetsDataMap["python-logo"], label: 'Python' },
  { src: assetsDataMap["docker-logo"], label: 'Docker' },
  { src: assetsDataMap["kubernetes-logo"], label: 'Kubernetes' },
  { src: assetsDataMap["graph-logo"], label: 'GraphQL' },
  { src: assetsDataMap["mongo-logo"], label: 'MongoDB' },
  { src: assetsDataMap["mysql-logo"], label: 'MySQL' },
  { src: assetsDataMap["postgresql-logo"], label: 'PostgreSQL' },
  { src: assetsDataMap["aws-logo"], label: 'AWS' },
  { src: assetsDataMap["git-logo"], label: 'Git & GitHub' },
  { src: assetsDataMap["figma-logo"], label: 'Figma' },
];

const Card = () => {
  const [visibleItems, setVisibleItems] = useState(allTechStackItems.slice(0,6));
  const [batchIndex, setBatchIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true); 

      setTimeout(() => {
        const nextIndex = (batchIndex + 1) % 3;
        const start = nextIndex * 6;
        const end = start + 6;

        setVisibleItems(allTechStackItems.slice(start, end));
        setBatchIndex(nextIndex);
        setIsTransitioning(false); 
      }, 600); 
    }, 3000);

    return () => clearInterval(interval);
  }, [batchIndex]);

  return (
    <div className="w-full px-4 py-10 bg-white text-center">
      <h2 className="text-[22px] md:text-[28px] font-bold text-[#2E3E95] mb-4">
        Skilled IT professionals for 15+ Dedicated Services
      </h2>
              <hr className="w-[150px] border-t-[3px] border-[#2e3e95] mx-auto mb-6" />{" "}


      <div className="flex flex-wrap justify-center gap-x-8 gap-y-8">
        {visibleItems.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center w-[100px] transition-opacity duration-700 ease-in-out ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="w-[80px] h-[80px] relative rounded-full">
              <Image
                src={item.src}
                alt={item.label}
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
            <p className="mt-2 text-sm font-medium text-[#0078D7]">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
