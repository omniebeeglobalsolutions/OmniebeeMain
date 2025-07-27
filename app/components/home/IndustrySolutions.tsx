"use client";
import { useState } from "react";
import { assetsDataMap } from "@/app/utils/assetsDataMap";
import Link from "next/link";

const industryItems = [
  {
    label: "Healthcare",
    icon: assetsDataMap["Home-Health"],
    slug: "healthcare",
    description:
      "Healthcare web and app development is an Omniebee specialty. We value our healthcare users highly, and we want their efforts to be reflected through a highly functional, secure, and easy-to-use website....",
  },
  {
    label: "Retail & E-Commerce",
    icon: assetsDataMap["Home-Truck"],
    slug: "retailandecommerce",
    description:
      "Retail success today depends on digital speed, seamless experiences, and real-time insight. We help brands build robust, mobile-ready storefronts that drive engagement and sales.....",
  },
  {
    label: "Banking & Finance",
    icon: assetsDataMap["Home-Dollar"],
    slug: "bankingandfinance",
    description:
      "The financial world is transforming fast — and your technology needs to keep up. We create banking and finance platforms that are not just secure and compliant, but also intuitive, lightning-fast, and data-driven.....",
  },
  {
    label: "AgriTech",
    icon: assetsDataMap["Home-AgriTech"],
    slug: "agritech",
    description:
      "Agriculture today is no longer just about soil and seeds — it’s about data, efficiency, and automation. Our AgriTech platforms connect farmers and agribusinesses with smart tools to monitor fields, predict yields, manage resources, and sell crops profitably......",
  },
  {
    label: "Travel & Tourism",
    icon: assetsDataMap["Home-Travel"],
    slug: "travelandtourism",
    description:
      "In the digital age, travel starts with a screen. Whether it’s flights, hotels, activities, or entire itineraries — we empower travel agencies, tour operators, and hospitality companies to deliver frictionless booking and planning experiences.....",
  },
  {
    label: "Education",
    icon: assetsDataMap["Home-Education"],
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

        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
            {industryItems.map((item, index) => {
              const isFlipped = flippedIndex === index;
              return (
                <div
                  key={item.label}
                  className="flip-card w-[350px] h-[240px] sm:h-[220px] cursor-pointer"
                  onClick={() => toggleFlip(index)}
                >
                  <div
                    className={`flip-card-inner transition-transform duration-700 ${
                      isFlipped ? "flipped" : ""
                    }`}
                  >
                    {/* FRONT */}
                    <div className="flip-card-front flex flex-col items-center justify-center text-center p-6 rounded-lg border border-[#2e3e95] shadow-md bg-white">
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="w-16 h-16 object-contain mb-4"
                      />
                      <h3 className="title">{item.label}</h3>
                    </div>

                    {/* BACK */}
                    <div className="flip-card-back flex flex-col items-center justify-center text-center p-6 rounded-lg border border-[#2e3e95] shadow-md bg-white">
                      <p className="text-sm mt-2 leading-[1.7]">
                        {item.description}
                      </p>
                      <Link
                        href={`/whatwedo/industries/${item.slug}`}
                        className="mt-4 button-tertiary text-white text-sm px-4 py-2 rounded hover:bg-red-600 transition"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustrySolutions;
