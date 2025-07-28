"use client";
import { useState } from "react";
import { assetsDataMap } from "@/app/utils/assetsDataMap";
import Link from "next/link";

const industryItems = [
  {
    label: "Healthcare",
    icon: assetsDataMap["Home-Health"] || "",
    slug: "healthcare",
    description:
      "Healthcare web and app development is an Omniebee specialty. We value our healthcare users highly, and we want their efforts to be reflected through a highly functional, secure, and easy-to-use website....",
  },
  {
    label: "Retail & E-Commerce",
    icon: assetsDataMap["Home-Truck"] || "",
    slug: "retailandecommerce",
    description:
      "Retail success today depends on digital speed, seamless experiences, and real-time insight. We help brands build robust, mobile-ready storefronts that drive engagement and sales.....",
  },
  {
    label: "Banking & Finance",
    icon: assetsDataMap["Home-Dollar"] || "",
    slug: "bankingandfinance",
    description:
      "The financial world is transforming fast — and your technology needs to keep up. We create banking and finance platforms that are not just secure and compliant, but also intuitive, lightning-fast, and data-driven.....",
  },
  {
    label: "AgriTech",
    icon: assetsDataMap["Home-AgriTech"] || "",
    slug: "agritech",
    description:
      "Agriculture today is no longer just about soil and seeds — it's about data, efficiency, and automation. Our AgriTech platforms connect farmers and agribusinesses with smart tools to monitor fields, predict yields, manage resources, and sell crops profitably......",
  },
  {
    label: "Travel & Tourism",
    icon: assetsDataMap["Home-Travel"] || "",
    slug: "travelandtourism",
    description:
      "In the digital age, travel starts with a screen. Whether it's flights, hotels, activities, or entire itineraries — we empower travel agencies, tour operators, and hospitality companies to deliver frictionless booking and planning experiences.....",
  },
  {
    label: "Education",
    icon: assetsDataMap["Home-Education"] || "",
    slug: "education",
    description:
      "Modern education is borderless and hybrid — and students expect engaging, on-demand content across devices. We help education providers launch platforms that support virtual classrooms, live tutoring, AI-powered assessments, and content personalization.....",
  },
];

const IndustrySolutions = () => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const toggleFlip = (index: number) => {
    setFlippedIndex(flippedIndex === index ? null : index);
  };

  // Debug: Check if icons are loading
  console.log("Available icons:", {
    health: assetsDataMap["Home-Health"],
    truck: assetsDataMap["Home-Truck"],
    dollar: assetsDataMap["Home-Dollar"],
    agritech: assetsDataMap["Home-AgriTech"],
    travel: assetsDataMap["Home-Travel"],
    education: assetsDataMap["Home-Education"],
  });

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#2E3E95] mb-5 italic">
          Delivering{" "}
          <span className="relative inline-block">
            <span className="inline-block font-semibold text-[#479BC9]">
              Best
            </span>
          </span>{" "}
          IT Solutions
        </h2>
        <hr className="w-[150px] border-t-[3px] border-[#2e3e95] mx-auto mb-8" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {industryItems.map((item, index) => {
            const isFlipped = flippedIndex === index;
            return (
              <div
                key={item.label}
                className="group"
                onClick={() => toggleFlip(index)}
              >
                {/* Desktop: 3D Flip Card */}
                <div className="hidden md:block perspective-1000">
                  <div
                    className={`relative w-full h-[260px] transition-all duration-700 transform-style-preserve-3d cursor-pointer ${
                      isFlipped ? "rotate-y-180" : ""
                    }`}
                  >
                    {/* FRONT */}
                    <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center text-center p-6 rounded-lg border border-[#2e3e95] shadow-md bg-white">
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="w-20 h-20 object-contain mb-4"
                      />
                      <h3 className="text-lg font-semibold text-[#2E3E95]">
                        {item.label}
                      </h3>
                    </div>

                    {/* BACK */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center text-center p-6 rounded-lg border border-[#2e3e95] shadow-md bg-white">
                      <p className="text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <Link
                        href={`/whatwedo/industries/${item.slug}`}
                        className="inline-block bg-[#2E3E95] text-white text-sm px-6 py-2 rounded-lg hover:bg-[#479BC9] transition-colors duration-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Mobile: Simple Expand/Collapse Card */}
                <div className="md:hidden">
                  <div className="w-full border border-[#2e3e95] shadow-md bg-white rounded-lg overflow-hidden">
                    {/* Always visible header */}
                    <div className="flex flex-col items-center justify-center text-center p-4 bg-white">
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="w-16 h-16 object-contain mb-3"
                      />
                      <h3 className="text-base font-semibold text-[#2E3E95] mb-2">
                        {item.label}
                      </h3>
                    </div>

                    {/* Expandable content */}
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isFlipped ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="p-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-sm leading-relaxed mb-4 text-gray-700">
                          {item.description}
                        </p>
                        <Link
                          href={`/whatwedo/industries/${item.slug}`}
                          className="inline-block bg-[#2E3E95] text-white text-sm px-6 py-2 rounded-lg hover:bg-[#479BC9] transition-colors duration-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default IndustrySolutions;
