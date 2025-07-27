import { assetsDataMap } from "@/app/utils/assetsDataMap";
import Image from "next/image";
import Link from "next/link";

const animatedText = "Building your Future-Ready Solutions";

const HeroSection = () => {
  const renderAnimatedText = () => {
    return (
      <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-semibold text-[#FFFFFF] leading-snug mb-2 flex flex-wrap">
        {animatedText.split("").map((char, i) => (
          <span
            key={i}
            className="char-animate"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    );
  };

  return (
    <div className="relative w-full pt-[0px] sm:pt-0">
      {/* Banner Image */}
      <Image
        src={assetsDataMap["homebanner"]}
        alt="Hero Banner"
        width={1920}
        height={750}
        className="w-full h-auto object-cover"
        priority
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2E3E95BF] to-[#D9D9D91A] z-0" />

      {/* Content Layer */}
      <div className="absolute inset-0 flex items-center px-4 lg:px-12 z-10">
        <div className="max-w-4xl text-white">
          <p className="text-lg font-medium mb-3 flex items-center gap-3">
            <span className="w-14 h-1.5 bg-[#56B9F0] inline-block rounded-sm"></span>
            Work with <span className="text-[#56B9F0] text-2xl">Omniebee</span>
          </p>

          <div className="hidden sm:block">
            {renderAnimatedText()}
            <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-semibold leading-snug mb-4">
              for a <span className="text-[#61c1f5]">Smarter World</span>
            </h2>
            <p className="text-sm sm:text-base font-normal text-white mb-6 max-w-2xl leading-relaxed text-justify">
              Omniebee Global Solutions delivers next-gen digital services,
              specializing in full-stack development, cloud technologies, UI/UX
              design, and tech training. We empower startups and enterprises
              across industries like education, healthcare, retail, and IT
              services to thrive with innovative, scalable solutions.
            </p>
          </div>

          {/* <div className="sm:block flex justify-start">
            <Link href="/about">
              <button className="bg-[#56B9F0] text-white px-6 py-2 rounded-full font-semibold text-sm shadow-md hover:bg-[#4aaede] transition cursor-pointer">
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Learn More</span>
              </button>
            </Link>
          </div> */}
          <div className="sm:block flex justify-start">
           <Link href="/about">
          <button className="learn-more">
            <span className="circle bg-[#56B9F0]" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text text-white">Know More</span>
          </button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
