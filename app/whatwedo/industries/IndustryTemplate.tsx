import AnimatedBubbles from "@/app/about/Components/AnimatedBubbles";
import Form from "@/app/components/reusable/Form";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Section {
  heading?: string;
  content?: string;
  cta?: string;
  image?: string;
  list?: string[];
  icon?: string;
  highlight?: { heading: string; cta: string };
  subheading?: string;
  features?: string[];
  tiles?: { title: string; content: string; icon?: string }[];
  ctaSection?: {
    heading: string;
    description: string;
    cta: string;
    backgroundImage: string;
  };
}

interface IndustryData {
  name: string;
  tagline: string;
  description: string;
  cta: string;
  bannerImage: string;
  sections: Section[];
}

export default function IndustryTemplate({ data }: { data: IndustryData }) {
  return (
    <div className="w-full">
      <section className="bg-gradient-to-b from-[#1E232A] to-[#2E3E95] text-white py-2 md:py-1">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16 gap-8">
          <div className="flex-1 text-center md:text-left">
            <p className="text-base sm:text-base text-white mb-2 sm:mb-0">
              {data.name}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 sm:mb-5 font-poppins">
              {data.tagline}
            </h1>
            <p className="text-sm sm:text-sm md:text-sm text-white font-medium sm:font-medium mb-6 sm:mb-7">
              {data.description}
            </p>
            <a
              href="#form-section"
              className="inline-block bg-[#56B9F0] hover:bg-[#6EC4F3] text-white font-bold py-2.5 px-6 sm:py-3 sm:px-8 rounded transition duration-200 text-center"
            >
              {data.cta}
            </a>
          </div>
          <div className="flex-1 flex justify-center items-end h-[400px]">
            <Image
              src={data.bannerImage}
              alt={`${data.name} Illustration`}
              width={450}
              height={300}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      <section className="relative bg-white py-12 sm:py-16 px-4 sm:px-6 md:px-10 overflow-hidden">
        <AnimatedBubbles />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src={data.sections[0].image || "/Services/AgriTechOne.jpg"}
              alt="Healthcare Team Illustration"
              width={500}
              height={500}
              className="object-contain max-w-[80%] md:max-w-full h-auto"
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-base sm:text-xl md:text-xl font-bold text-[#2E3E95] mb-4 leading-snug w-[350px] mx-auto text-center">
              {data.sections[0].heading}
            </h2>
            <p className="text-[#262626] mb-6 sm:mb-10 text-base sm:text-base text-justify leading-[25px] w-full max-w-[580px] mx-auto md:mx-0 px-4 sm:px-0
">
              {data.sections[0].content}
            </p>
            <a
              href="#form-section"
              className="inline-block bg-[#56B9F0] hover:bg-[#6EC4F3] text-white font-semibold py-3 px-6 rounded transition duration-300 w-[175px] h-[50px] text-center"
            >
              {data.sections[0].cta}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          <h2 className="block lg:hidden text-2xl sm:text-xl text-center font-medium text-[#2E3E95] mb-2 ">
            {data.sections[1].heading}
          </h2>
          <div className="flex-1 flex justify-center order-2 lg:order-2 ">
            <Image
              src={data.sections[1].icon || "/placeholder.png"}
              alt="Healthcare Expectations Illustration"
              width={450}
              height={450}
              className="w-full max-w-lg sm:max-w-xl h-auto object-contain"
              priority
            />
          </div>
          <div className="flex-1 w-full  lg:text-left order-3 lg:order-1">
            <h2 className="hidden lg:block text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2E3E95] mb-6 w-full lg:w-[400px]">
              {data.sections[1].heading}
            </h2>

            <ul className="list-disc pl-5 space-y-3 text-[#000000] text-base sm:text-lg max-w-md mx-auto lg:mx-0">
              {data.sections[1].list?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="bg-gradient-to-b from-[#1E232AE5] to-[#2E3E95] px-4 sm:px-6 md:px-10 py-11">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6 md:gap-20">
          <h2 className="text-white text-lg sm:text-xl md:text-2xl font-extrabold">
            {data.sections[2].highlight?.heading}
          </h2>

          <a
            href="#form-section"
            className="bg-[#56B9F0] hover:bg-[#6EC4F3] text-white font-semibold px-6 py-2 rounded transition duration-200"
          >
            {data.sections[2].highlight?.cta}
          </a>
        </div>
      </section>

      <section className="px-6 py-12 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={data.sections[3].image || "/Services/Healthcare3rdSlide.jpg"}
              alt="Healthcare Software Illustration"
              className="w-full max-w-md md:max-w-full h-auto object-contain"
            />
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/2 text-left leading-7 text-base">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#2E3E95] mb-4 mt-6 md:mt-[74px]">
              {data.sections[3].heading}
            </h2>
            <p className="text-[#000000] mb-6 text-justify font-medium leading-6 max-w-full md:max-w-[550px]">
              {data.sections[3].content}
            </p>
            <h3 className="text-lg mb-2 font-medium">Key Features:</h3>
            <ul className="list-disc list-inside space-y-2 text-[#000000] font-medium">
              {data.sections[3].features?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-16 lg:px-24 bg-white text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#2E3E95] mb-2">
          {data.sections[4].heading}
        </h2>
        <div className="w-24 h-[2px] bg-[#2E3E95] mx-auto mb-4" />
        <p className="text-[#2E3E95] font-medium mb-12">
          {data.sections[4].subheading}
        </p>

        <div className="grid sm:gap-0 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center sm:max-w-[1200px] sm:mx-auto gap-y-5 sm:gap-y-0">
          {data.sections[4].tiles?.map((tile, index) => (
            <div
              key={index}
              className="bg-[#2E3E95] text-white p-6 rounded-lg shadow-md flex flex-col justify-between w-full max-w-[320px] h-[320px]"
            >
              <div>
                <h3 className="text-lg font-bold mb-4 flex justify-between items-start text-left">
                  {tile.title}
                  <img
                    src={tile.icon}
                    alt={`icon${index}`}
                    className="w-10 h-10"
                  />
                </h3>
                <p className="text-sm leading-relaxed text-left">{tile.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#1E232AE5] to-[#2E3E95] px-4 sm:px-6 md:px-10 h-[150px]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6 md:gap-12">
          <h2 className="text-white text-lg sm:text-xl md:text-2xl font-extrabold w-full md:w-1/3">
            {data.sections[5].ctaSection?.heading}
          </h2>

          <p className="text-white text-sm sm:text-base font-normal w-full md:w-1/3 text-justify">
            {data.sections[5].ctaSection?.description}
          </p>

          <a
            href="#form-section"
            className="bg-[#56B9F0] hover:bg-[#6EC4F3] text-white font-semibold px-6 py-2 rounded transition duration-200"
          >
            {data.sections[5].ctaSection?.cta}
          </a>
        </div>
      </section>

      <div id="form-section">
        <Form />
      </div>
    </div>
  );
}
