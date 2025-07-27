"use client";
import { assetsDataMap } from "@/app/utils/assetsDataMap";
import Image from "next/image";

export default function ValuesMissionVisionSection() {
  return (
    <section className="sm:py-20 py-0 px-4 sm:px-6 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Left Text Content */}
        <div className="flex flex-col justify-center flex-1 text-center lg:text-left font-poppins">
          <h2 className="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[38px] font-bold text-[#2E3E95] leading-snug mb-3 italic">
            Our Values, Mission <br className="hidden sm:block" /> and Vision
          </h2>
          <hr className="w-[120px] sm:w-[150px] border-t-[3px] border-[#2e3e95] mx-auto lg:mx-0 mb-4" />
          <p className="text-[14px] sm:text-[15px] text-black font-inter leading-relaxed max-w-full lg:max-w-[578px] text-justify mx-auto lg:mx-0">
            At Omniebee Global Solutions, we are driven by purpose, powered by
            technology, and committed to creating long-term value for our
            clients, teams, and communities. Our core belief lies in the power
            of innovation, strategic collaboration, and forward-thinking
            solutions that help organizations adapt to a rapidly evolving
            digital world. We are passionate about building resilient systems,
            enabling growth, and making technology an enabler—not a barrier—for
            success.
          </p>
        </div>

        {/* Right Cards Section */}
        <div className="flex flex-1 flex-col items-center lg:flex-row lg:justify-start gap-8 font-inter relative">
          {/* Left Column (Values & Vision) */}
          <div className="flex flex-col gap-6">
            {/* Our Values */}
            <div className="border border-[#2E3E95] rounded-md p-5 shadow-sm w-full max-w-[300px] transition-all duration-200 hover:border-[3px] hover:shadow-[0_0px_20px_0_#2e3e95]">
              <div className="mb-3">
                <Image
                  src={assetsDataMap["About-values"]}
                  alt="Values Icon"
                  width={60}
                  height={60}
                />
              </div>
              <h3 className="font-semibold text-black text-[20px] sm:text-[22px] mb-2 font-poppins">
                Our Values
              </h3>
              <p className="text-[14px] sm:text-[15px] text-black font-medium leading-relaxed">
                We believe in transparency, honesty, and ethical decision-making
                at every step. We strive for continuous improvement and quality
                in everything we do.
              </p>
            </div>

            {/* Our Vision */}
            <div className="border border-[#2E3E95] rounded-md p-5 shadow-sm w-full max-w-[300px] transition-all duration-200 hover:border-[3px] hover:shadow-[0_0px_20px_0_#2e3e95]">
              <div className="mb-3">
                <Image
                  src={assetsDataMap["About-target"]}
                  alt="Vision Icon"
                  width={60}
                  height={60}
                />
              </div>
              <h3 className="font-semibold text-black text-[20px] sm:text-[22px] mb-2 font-poppins">
                Our Vision
              </h3>
              <p className="text-[14px] sm:text-[15px] text-black font-medium leading-relaxed">
                To become a globally trusted technology partner recognized for
                excellence, innovation, and the ability to turn ideas into
                transformative digital experiences.
              </p>
            </div>
          </div>

          {/* Our Mission (Stacked or Right-aligned) */}
          <div className="border border-[#2E3E95] rounded-md p-5 shadow-sm w-full max-w-[300px] transition-all duration-200 hover:border-[3px] hover:shadow-[0_0px_20px_0_#2e3e95]">
            <div className="mb-3">
              <Image
                src={assetsDataMap["About-mission"]}
                alt="Mission Icon"
                width={60}
                height={60}
              />
            </div>
            <h3 className="font-semibold text-black text-[20px] sm:text-[24px] mb-2 font-poppins">
              Our Mission
            </h3>
            <p className="text-[14px] sm:text-[15px] text-black font-medium leading-relaxed">
              To deliver intelligent, scalable, and impactful digital solutions
              that empower businesses to grow, innovate, and lead in a
              technology-driven world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
