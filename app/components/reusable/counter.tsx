"use client";
import { useEffect, useState } from "react";

interface CounterProps {
  end: number;
  duration?: number;
}

const Counter: React.FC<CounterProps> = ({ end, duration = 1500 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 6); // ~60fps

    const step = () => {
      start += increment;
      if (start < end) {
        setCount(Math.floor(start));
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);
  }, [end, duration]);

  return (
    <div className="text-5xl font-bold text-blue-900 mt-4">
      {count.toLocaleString()}
    </div>
  );
};

export default Counter;
