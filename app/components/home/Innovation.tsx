import { assetsDataMap } from "@/app/utils/assetsDataMap";
import Image from "next/image";
import Link from "next/link";

const Innovation = () => {
  return (
    <div className="relative w-full h-[400px]">
      {/* Background Image */}
      <Image
        src={assetsDataMap["home-career"]}
        alt="Innovation Background"
        layout="fill"
        objectFit="cover"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#2E3E95BF] to-[#D9D9D91A] z-0" />

      <div className="absolute inset-0 flex items-center justify-start px-6 sm:px-20 z-10">
        <div className="max-w-2xl text-white">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4 -mt-6 sm:mb-10">
            Innovating Together, Building Tomorrow
          </h2>

          <p className="text-sm sm:text-base text-white mb-6 leading-relaxed hidden sm:block text-justify">
            At Omniebee Global Solutions, we are more than just a tech company—
            we are a collective of thinkers, builders, and innovators shaping
            the digital future. Our workplace thrives on collaboration,
            integrity, and continuous learning. We believe that when passion
            meets purpose, extraordinary outcomes follow.
          </p>

          <Link href="/careers">
            <button className="button-primary text-white rounded-md text-sm sm:text-base font-medium cursor-pointer">
              Explore Careers With Us
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Innovation;
