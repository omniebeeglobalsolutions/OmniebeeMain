"use client";

import { useEffect, useState } from "react";
import "@/app/globals.css"; // make sure this is present in your _app file
import Image from "next/image";
import { assetsDataMap } from "@/app/utils/assetsDataMap";
import Link from "next/link";

// Arrow Icon
const ArrowIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="absolute top-3 right-3"
  >
    <line x1="5" y1="19" x2="19" y2="5" />
    <polyline points="7 5 19 5 19 17" />
  </svg>
);

// Carousel Component
const ImageCarousel = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 1500);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={images[index]}
        alt="carousel image"
        fill
        className="object-cover transition-opacity duration-1000"
      />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, i) => (
          <span
            key={i}
            className={`w-10 h-1 rounded-full transition-all duration-300 ${
              i === index ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Main Component
const OurServices = () => {
  const [showAllServices, setShowAllServices] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // New state for mobile view

  // Determine initial screen size and add resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the 'md' breakpoint
    };

    // Set initial state
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  const devImages = [
    assetsDataMap["homeDev"],
    assetsDataMap["home-devTwo"],
    assetsDataMap["Home-devThree"],
  ];
  const supportImages = [
    assetsDataMap["Home-tsOne"],
    assetsDataMap["Home-tsTwo"],
    assetsDataMap["Home-tsThree"],
  ];

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <h2 className="text-center text-3xl font-bold mb-3 text-[#2E3E95]">
        Our Services
      </h2>
      <hr className="w-[120px] border-t-[3px] border-[#2e3e95] mx-auto mb-8" />

      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        {/* Left Column (Always visible) */}
        <div className="flex flex-col justify-between md:h-[500px] gap-6">
          <Link href="/whatwedo/services/687a09c0ff8f487cbd3cf2d8">
            <div className="w-[350px] sm:w-56 h-[140px] sm:h-[350px] rounded-t-[20px] sm:rounded-t-[150px] rounded-[20px] sm:rounded-[40px] overflow-hidden relative mx-auto md:mx-0 group">
              <Image
                src={assetsDataMap["Home-staffing"]}
                alt="Website Design"
                fill
                className="object-cover"
              />

              {/* Always visible black overlay */}
              <div className="absolute inset-0 bg-black/60 z-10 flex flex-col justify-between px-5 sm:pt-20 pt-2 pb-6 transition-all duration-700">
                {/* Title and Arrow */}
                <div className="flex items-center justify-between">
                  <span className="text-white text-lg font-semibold text-left">
                    Staffing Solutions
                  </span>
                  <div style={{ paddingTop: "10px" }}>
                    <img
                      src={assetsDataMap["arrow-up"]}
                      alt="arrow"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>

                {/* Hidden description that appears on hover */}
                <div className="text-white text-xs font-normal opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-[-5px] sm:group-hover:translate-y-[-50px] transition-all duration-500 ease-in-out text-justify">
                  Our Staffing Solutions are designed to help businesses find
                  the right talent at the right time. We bridge the gap between
                  urgent workforce needs and skilled professionals ready to
                  contribute from day one.
                </div>
              </div>
            </div>
          </Link>

          <Link href="/whatwedo/services/687a2e24e7dd05494d3087d9">
            <div className="w-[350px] sm:w-56 h-[140px] rounded-t-2xl rounded-b-2xl overflow-hidden relative mx-auto md:mx-0 group">
              <Image
                src={assetsDataMap["Home-EduTraining"]}
                alt="Educational Training"
                fill
                className="object-cover"
              />

              {/* Always-visible black overlay */}
              <div className="absolute inset-0 bg-black/60 z-10 flex flex-col justify-between px-4 py-4">
                {/* Top section: Title + Arrow */}
                <div className="flex items-center justify-between w-full">
                  <span className="text-white text-base font-semibold z-20 text-left">
                    Educational Training
                  </span>
                  <ArrowIcon />
                </div>

                {/* Bottom section: Chips (hidden by default, appear on hover) */}
                <div className="relative overflow-hidden h-[30px] sm:h-0 sm:group-hover:h-[30px] transition-all duration-500 ease-in-out">
                  <div className="flex gap-2 w-max min-w-[200%] animate-scroll-left">
                    {["Training", "EdTech", "Skill Training", "Workshops"].map(
                      (label, i) => (
                        <span
                          key={i}
                          className="inline-block bg-white/20 border border-white text-white text-xs rounded-full px-3 py-1 whitespace-nowrap"
                        >
                          {label}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Conditional rendering for other services based on isMobile and showAllServices */}
        {(!isMobile || showAllServices) && (
          <>
            {/* Middle Column with Carousel */}
            <div className="flex md:h-[500px] gap-6 flex-col md:flex-row items-center justify-center">
              <Link href="/whatwedo/services/6879f664ff8f487cbd3cf2c2">
                <div className="w-[350px] sm:w-48 h-[150px] sm:h-[500px] rounded-[20px] sm:rounded-[40px] overflow-hidden relative group">
                  {/* Background image carousel */}
                  <ImageCarousel images={devImages} />

                  {/* Always-visible black overlay */}
                  <div className="absolute inset-0 bg-black/60 z-10" />

                  {/* Always-visible title and arrow */}
                  <div className="absolute inset-0 z-20 flex flex-col">
                    <div className="flex items-center justify-between w-full px-5 pt-5">
                      <span className="text-white text-base font-semibold text-left">
                        Software Development
                      </span>
                    </div>

                    {/* Description: hidden by default, shown on hover */}
                    <span className="text-white text-xs pt-3 px-5 leading-[1.2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-justify">
                      At Omniebee Global Solutions, we believe mobile apps are
                      more than just digital tools — they are strategic assets
                      that drive growth....
                    </span>
                  </div>
                </div>
              </Link>

              <Link href="/whatwedo/services/6879fa0bff8f487cbd3cf2ca">
                <div className="w-[350px] sm:w-48 h-[150px] sm:h-[500px] rounded-[20px] sm:rounded-[40px] overflow-hidden relative group">
                  {/* Background image carousel */}
                  <ImageCarousel images={supportImages} />

                  {/* Always-visible black overlay */}
                  <div className="absolute inset-0 bg-black/60 z-10" />

                  {/* Always-visible title and arrow */}
                  <div className="absolute inset-0 z-20 flex flex-col">
                    <div className="flex items-center justify-between w-full px-5 pt-5">
                      <span className="text-white text-base font-semibold text-left">
                        Technical Support
                      </span>
                    </div>

                    {/* Description: hidden by default, shown on hover */}
                    <span className="text-white text-xs pt-3 px-5 leading-[1.2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-justify">
                      Our Technical Support Services are designed to ensure
                      uninterrupted development workflows, faster issue
                      resolution, and optimized project delivery.....
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Column */}
            <div className="flex flex-col justify-between md:h-[500px] gap-6">
              {/* Business Consulting Card */}
              <Link href="/whatwedo/services/687a112eff8f487cbd3cf2dd">
                <div className="w-[350px] sm:w-56 h-[140px] rounded-2xl overflow-hidden relative mx-auto md:mx-0 group">
                  <Image
                    src={assetsDataMap["Home-BusinessConsulting"]}
                    alt="Business Consulting"
                    fill
                    className="object-cover"
                  />

                  {/* Always visible black overlay */}
                  <div className="absolute inset-0 bg-black/60 z-10" />

                  {/* Content wrapper */}
                  <div className="absolute inset-0 z-20 flex flex-col">
                    {/* Title + Arrow (always visible) */}
                    <div className="flex items-center justify-between w-full px-5 pt-5">
                      <span className="text-white text-base font-semibold text-left">
                        Business Consulting
                      </span>
                      <ArrowIcon />
                    </div>

                    {/* Chips scroll — only visible on hover */}
                    <div className="relative overflow-hidden px-4 mt-auto mb-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex gap-2 w-max min-w-[200%] animate-scroll-left">
                        {[
                          "Operations",
                          "Consulting",
                          "Optimization",
                          "Strategy",
                        ].map((label, i) => (
                          <span
                            key={i}
                            className="inline-block bg-white/20 border border-white text-white text-xs rounded-full px-3 py-1 whitespace-nowrap"
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* IT Consulting Card */}
              <Link href="/whatwedo/services/687a04e6ff8f487cbd3cf2d3">
                <div className="w-[350px] sm:w-56 h-[140px] sm:h-[350px] rounded-[20px] sm:rounded-[40px] sm:rounded-b-[150px] rounded-b-[20px] overflow-hidden relative mx-auto md:mx-0 group">
                  <Image
                    src={assetsDataMap["Home-ITConsulting"]}
                    alt="Consultancy Solutions"
                    fill
                    className="object-cover"
                  />

                  {/* Always visible dark overlay */}
                  <div className="absolute inset-0 bg-black/60 z-10" />

                  {/* Content on top of overlay */}
                  <div className="absolute inset-0 z-20 flex flex-col">
                    {/* Title + Arrow at top */}
                    <div className="relative flex items-center justify-between w-full px-5 pt-5">
                      <span className="text-white text-lg font-semibold text-left">
                        IT Consulting
                      </span>
                      <ArrowIcon />
                    </div>

                    {/* Chips scroll - only on hover */}
                    <div className="flex-grow flex items-center justify-center">
                      <div className="relative overflow-hidden px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="flex gap-2 w-max min-w-[200%] animate-scroll-left">
                          {[
                            "Tech Help",
                            "IT Audit",
                            "Tech Advisory",
                            "Cloud Strategy",
                          ].map((label, i) => (
                            <span
                              key={i}
                              className="inline-block bg-white/20 border border-white text-white text-xs rounded-full px-3 py-1 whitespace-nowrap"
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>

      {/* View More Services Button for Mobile */}
      {isMobile && !showAllServices && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAllServices(true)}
            className="button-tertiary text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-opacity duration-300"
          >
            View More Services
          </button>
        </div>
      )}
    </div>
  );
};

export default OurServices;