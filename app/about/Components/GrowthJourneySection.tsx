"use client";

import { assetsDataMap } from "@/app/utils/assetsDataMap";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const BUBBLES = [
  { size: 12, color: "bg-blue-400" },
  { size: 15, color: "bg-blue-300" },
  { size: 10, color: "bg-blue-500" },
  { size: 13, color: "bg-blue-400" },
  { size: 10, color: "bg-blue-400" },
];

function getRandomPosition(parentWidth: number, parentHeight: number, size: number) {
  const pad = 10;
  const x = Math.random() * (parentWidth - size - pad * 2) + pad;
  const y = Math.random() * (parentHeight - size - pad * 2) + pad;
  return { x, y };
}

export default function GrowthJourneySection() {
  const parentRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState(
    BUBBLES.map(() => ({ x: 0, y: 0 }))
  );
  const targets = useRef<{ x: number; y: number }[]>([]);
  const animationRef = useRef<number>(0);

  // Initialize positions and targets
  useEffect(() => {
    if (!parentRef.current) return;
    const { width, height } = parentRef.current.getBoundingClientRect();
    const initial = BUBBLES.map(bubble =>
      getRandomPosition(width, height, bubble.size)
    );
    setPositions(initial);
    targets.current = BUBBLES.map(bubble =>
      getRandomPosition(width, height, bubble.size)
    );
  }, []);

  useEffect(() => {
    function animate() {
      if (!parentRef.current) return;
      const { width, height } = parentRef.current.getBoundingClientRect();
      setPositions(prev =>
        prev.map((pos, i) => {
          const target = targets.current[i];
          const dx = target.x - pos.x;
          const dy = target.y - pos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          // If close to target, pick a new one
          if (dist < 2) {
            targets.current[i] = getRandomPosition(width, height, BUBBLES[i].size);
            return pos;
          }
          // Move at constant velocity (pixels per frame)
          const velocity = 0.7; // lower = slower, higher = faster
          return {
            x: pos.x + (dx / dist) * velocity,
            y: pos.y + (dy / dist) * velocity,
          };
        })
      );
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <section className="relative py-8 px-4 sm:py-10 sm:px-6 md:py-12 md:px-12 lg:py-14 lg:px-24 bg-white overflow-hidden font-inter">
      <div
        ref={parentRef}
        className="max-w-7xl mx-auto flex flex-col gap-8 sm:gap-10 md:gap-12 lg:flex-row lg:gap-16 relative"
        style={{ minHeight: 400 }}
      >
        {/* Images */}
        <div className="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[550px] flex justify-center items-center order-2 lg:order-1 z-10">
          <div className="absolute top-[30px] left-[27px] sm:top-[30px] sm:left-[30px] md:left-[40px] w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] rounded-full overflow-hidden  z-10 shadow-[0_0_30px_#56B9F066]">
            <Image
              src={assetsDataMap["About-2ndSlideOne"]}
              alt="Team discussion"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute lg:top-[8rem] top-[7rem] bottom-[0px] right-[25px] sm:right-[30px] md:right-[40px] w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[360px] lg:h-[360px] rounded-full overflow-hidden shadow-[0_0_30px_#56B9F066] z-10">
            <Image
              src={assetsDataMap["About-2ndSlideTwo"]}
              alt="Team collaboration"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Bubbles ABOVE images */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {BUBBLES.map((bubble, i) => (
            <span
              key={i}
              className={`${bubble.color} rounded-full absolute`}
              style={{
                width: bubble.size,
                height: bubble.size,
                left: positions[i]?.x ?? 0,
                top: positions[i]?.y ?? 0,
              }}
            />
          ))}
        </div>

        {/* Heading on top for mobile */}
        <h2 className="text-[30px] sm:text-[36px] md:text-[42px] lg:text-[45px] font-bold text-[#2E3E95] mb-4 sm:mb-5 md:mb-6 lg:hidden text-center font-poppins">
          Our Growth Journey
        </h2>

        {/* Text Content */}
        <div className="w-full order-3 lg:order-2 text-center lg:text-left px-4 sm:px-6 md:px-8 lg:px-0">
          <h2 className="hidden lg:block text-[45px] font-poppins font-bold text-[#2E3E95] mb-3">
            Our Growth Journey
          </h2>
          <hr className="w-[150px] border-t-[3px] border-[#2e3e95] mx-auto lg:mx-0 mb-3" />{" "}
          <p className="text-justify max-w-[775px] mx-auto text-[16px] font-normal leading-[24px] sm:leading-[26px] md:leading-[28px] lg:leading-[27px]">
            The journey of Omniebee Global Solutions began with a simple vision: to become a catalyst for digital innovation. What started as a small group of passionate technologists has grown into a trusted IT partner for businesses across industries and continents. As we look to the future, our commitment remains the same — to deliver excellence, empower businesses, and lead with innovation, one line of code at a time.
          </p>
          <br />
          <p className="text-justify max-w-[775px] mx-auto text-[16px] font-normal leading-[24px] sm:leading-[26px] md:leading-[28px] lg:leading-[27px]">
            At Omniebee, we believe growth is a journey — not just for us, but for every client we work with. That’s why we walk alongside you, helping navigate the digital landscape with clarity, confidence, and a shared vision for success.
          </p>
        </div>
      </div>
    </section>
  );
}