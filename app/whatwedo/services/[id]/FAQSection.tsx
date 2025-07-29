"use client";

import { useState, useRef, useEffect } from "react";

export default function FAQSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[#2e3e95] mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const contentRef = useRef<HTMLDivElement>(null);
            const [height, setHeight] = useState(0);

            useEffect(() => {
              if (isOpen && contentRef.current) {
                setHeight(contentRef.current.scrollHeight);
              } else {
                setHeight(0);
              }
            }, [isOpen]);

            return (
              <div
                key={index}
                className={`border rounded-lg transition-all duration-300 ${
                  isOpen ? "shadow-md border-[#2e3e95]" : "border-gray-300"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center text-left px-4 py-3 cursor-pointer text-lg font-medium text-[#2e3e95]"
                >
                  {faq.question}
                  <span className="text-xl font-bold">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  ref={contentRef}
                  style={{
                    height: `${height}px`,
                    overflow: "hidden",
                    transition: "height 0.3s ease",
                  }}
                >
                  <div className="px-4 pb-4 text-sm text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
