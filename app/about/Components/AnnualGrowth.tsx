"use client";
import { assetsDataMap } from "@/app/utils/assetsDataMap";
import Image from "next/image";

export default function StatsSection() {
  const stats = [
    {
      value: "125%",
      icon: assetsDataMap["About-growth"],
      description:
        "Achieved a remarkable 125% annual growth rate over the last two years, customer satisfaction, and consistent project delivery.",
    },
    {
      value: "4+",
      icon: assetsDataMap["About-modelling"],
      description: (
        <>
          Agile, Fixed Bid, Offshore, and <br /> POD – to match every client’s{" "}
          <br />
          need.
        </>
      ),
    },
    {
      value: "100%",
      icon: assetsDataMap["About-teacher"],
      description: (
        <>
          We not only build – we also <br /> mentor, train, and empower future{" "}
          <br /> tech leaders.
        </>
      ),
    },
  ];

  return (
    <section className="py-16 px-8 md:py-12 md:px-6 lg:px-24 bg-white font-inter mb-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15 text-center md:text-left sm:w-[1100px] mx-auto">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group flex flex-col items-center md:items-start"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 items-center">
              <p className="text-[32px] md:text-[40px] font-bold text-black order-2 sm:order-none group-hover:text-[#2e3e95] transition-all duration-300">
                {stat.value}
              </p>
              <div className="w-[80px] h-[80px] relative order-1 sm:order-none mt-2 sm:mt-0">
                <Image
                  src={stat.icon}
                  alt="icon"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-[16px] md:text-[16px] mt-2 max-w-[377px] leading-[22px] md:leading-[27px] group-hover:text-[#2e3e95] transition-all duration-300 ">
              {stat.description}
            </p>
            <div className="w-65 md:w-[350px] h-[3px] bg-gray-200 mt-4 group-hover:bg-[#2e3e95] transition-all duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
}
