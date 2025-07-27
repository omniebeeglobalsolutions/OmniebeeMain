"use client";
import { assetsDataMap } from "@/app/utils/assetsDataMap";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const BUBBLES = [
  { size: 12, color: "bg-[#479BC9]" },
  { size: 15, color: "bg-[#479BC9]" },
  { size: 10, color: "bg-[#479BC9]" },
  { size: 12, color: "bg-[#479BC9]" },
  { size: 15, color: "bg-[#479BC9]" },
  { size: 10, color: "bg-[#479BC9]" },
];

function getRandomPosition(parentWidth: number, parentHeight: number, size: number) {
  const pad = 10;
  const x = Math.random() * (parentWidth - size - pad * 2) + pad;
  const y = Math.random() * (parentHeight - size - pad * 2) + pad;
  return { x, y };
}

export default function NextGenSolutions() {
  const parentRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState(
    BUBBLES.map(() => ({ x: 0, y: 0 }))
  );
  const targets = useRef<{ x: number; y: number }[]>([]);
  const animationRef = useRef<number | null>(null);

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
    <section
      ref={parentRef}
      className="relative px-4 md:px-16 py-12 bg-white overflow-hidden"
      style={{ minHeight: 500 }}
    >
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


      <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
          <h4 className="text-[#479BC9] font-semibold  mb-2 animate-bounce text-lg">
            2+ Years of Excellence
          </h4>
          <h2 className="text-3xl md:text-4xl font-bold text-[#479BC9] leading-tight mb-4">
            Your Trusted Partner for <br />
            <span className="text-[#479BC9]">Next-Gen Digital Solutions</span>
          </h2>
          <p className="text-[#000000] mb-6 text-justify">
            Omniebee Global Solutions is a results-driven IT services company, delivering excellence in web and software development, cloud integration, UI/UX design, and full-stack consulting. We are committed to empowering businesses through smart, scalable, and secure technology solutions that drive performance and digital transformation. Our focus lies in creating tangible value through innovation, agility, and client-centric strategies.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-2">
                <Image src={assetsDataMap["Home-Settings"]} alt="Experience" width={24} height={24} />
                <h4 className="font-semibold text-2xl">Experience</h4>
              </div>
              <p className="text-[#000000] text-sm">
                We are headquartered in India, the world’s IT powerhouse, providing global clients with exceptional software development services.
              </p>
            </div>

            <div className="text-left">
              <div className="flex items-center gap-2 mb-2">
                <Image src={assetsDataMap["Home-Help"]} alt="Support" width={24} height={24} />
                <h4 className="font-semibold text-2xl">Quick Support</h4>
              </div>
              <p className="text-[#000000] text-sm">
                We ensure seamless communication and proactive support through modern collaboration tools.
              </p>
            </div>
          </div>
        </div>

        {/* Right Images */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1 row-span-2">
            <Image
              src={assetsDataMap["Home-2ndSlideOne"]}
              alt="Left Tall"
              width={400}
              height={500}
              className="w-full h-full object-cover rounded-bl-[60px] rounded-tr-[60px] rounded-br-[15px] rounded-tl-[15px]"
            />
          </div>
          <div className="col-span-1">
            <Image
              src={assetsDataMap["Home-2nd-SlideTwo"]}
              alt="Top Right"
              width={200}
              height={200}
              className="w-full h-full object-cover rounded-tl-[60px] rounded-br-[60px] rounded-bl-[15px] rounded-tr-[15px]"
            />
          </div>
          <div className="col-span-1">
            <Image
              src={assetsDataMap["Home-2ndSlideThree"]}
              alt="Bottom Right"
              width={200}
              height={200}
              className="w-full h-full object-cover rounded-tr-[60px] rounded-bl-[60px] rounded-tl-[15px] rounded-br-[15px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}