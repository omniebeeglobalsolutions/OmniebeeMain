import dynamic from "next/dynamic";

// Dynamic import of the client-side animated bubbles component
const AnimatedBubbles = dynamic(() => import("../Components/AnimatedBubbles"), {
  ssr: true,
});

export default function OurStorySection() {
  return (
    <section className="relative bg-white py-10 px-4 lg:px-32 text-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-0 relative min-h-[500px]">
        {/* Client-side animated bubbles */}
        <AnimatedBubbles />

        <h2 className="font-poppins text-[28px] sm:text-[32px] md:text-[38px] lg:text-[45px] font-bold text-[#2E3E95] mb-1 italic">
          Our Story
        </h2>

        {/* Line under heading */}
        <div className="flex justify-center mb-6">
          <div className="w-[120px] h-[3px] bg-[#2e3e95]" />
        </div>

        {/* Text content */}
        <div className="text-justify max-w-[1000px] mx-auto">
          <p className="font-inter text-[16px] font-medium text-black mb-6">
            Omniebee Global Solutions was founded with a singular mission: to bridge the gap between businesses and
            modern technology through impactful digital solutions. What began as a small team of passionate developers
            has evolved into a dynamic, full-service IT company delivering excellence across web development, cloud
            services, UI/UX design, and enterprise-level tech consulting.
          </p>
          <p className="font-inter text-[16px] font-medium text-black mb-6">
            Our journey is driven by curiosity, innovation, and the desire to create meaningful change. With every
            project, we challenge ourselves to go beyond code — to think deeper, design smarter, and build solutions
            that solve real-world problems. We empower startups, enterprises, and educational institutions with the
            tools and technologies needed to thrive in today’s digital-first world.
          </p>
          <p className="font-inter text-[16px] font-medium text-black mb-6">
            Headquartered in Hyderabad, we leverage the power of global talent, collaboration, and agile methodologies
            to deliver projects that are not only technically sound but also strategically aligned with our clients’
            goals. Our culture is rooted in transparency, continuous learning, and the belief that great teams build
            great products.
          </p>
          <p className="font-inter text-[16px] font-medium text-black mb-6">
            At Omniebee, we don’t just write code — we craft digital experiences, engineer performance, and foster
            long-term partnerships. Whether you're looking to launch a scalable product, transform your operations, or
            upskill your team, Omniebee is your trusted <br />
            partner in progress.
          </p>
          <p className="font-inter text-[16px] font-medium text-black text-center">
            We’re not just building software. <br />
            We’re building the future — together.
          </p>
        </div>
      </div>
    </section>
  );
}

