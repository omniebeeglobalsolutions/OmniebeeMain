
"use client";

import React, { useEffect, useRef, useState } from "react";

const BUBBLES = [
  { size: 12, color: "bg-blue-400" },
  { size: 15, color: "bg-blue-300" },
  { size: 13, color: "bg-blue-500" },
  { size: 10, color: "bg-blue-400" },
  { size: 11, color: "bg-blue-400" },
];

function getRandomPosition(parentWidth: number, parentHeight: number, size: number) {
  const pad = 10;
  const x = Math.random() * (parentWidth - size - pad * 2) + pad;
  const y = Math.random() * (parentHeight - size - pad * 2) + pad;
  return { x, y };
}

export default function AnimatedBubbles() {
    useEffect(() => {

        console.log("Running on:::::::::::::::::::::::::;;;;;;;;;;;;;;;;", typeof window === "undefined" ? "server" : "client");
    }, [])

  const parentRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState(
    BUBBLES.map(() => ({ x: 0, y: 0 }))
  );
  const targets = useRef<{ x: number; y: number }[]>([]);
  const animationRef = useRef<number>(0);

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
          if (dist < 2) {
            targets.current[i] = getRandomPosition(width, height, BUBBLES[i].size);
            return pos;
          }
          const velocity = 0.7;
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
    <div className="absolute inset-0 pointer-events-none z-20" ref={parentRef}>
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
  );
}
