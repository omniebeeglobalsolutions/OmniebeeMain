import { assetsDataMap } from "@/app/utils/assetsDataMap"

export default function AboutUs() {
  const bgImage = assetsDataMap["About-Banner"]
  return (
    <section className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[257px]">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url(${bgImage})`}} />
      {/* Optional Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2E3E95BF] to-[#D9D9D91A]" />

      {/* Text Content */}
      <div className="relative z-10 h-full px-4 sm:px-6 md:px-8 flex items-center justify-center sm:justify-start">
        <h2 className="font-poppins text-white font-extrabold text-[32px] sm:text-[40px] md:text-[50px] leading-tight text-center sm:text-left lg:ml-28">
          About Us
        </h2>
      </div>
    </section>
  );
}
