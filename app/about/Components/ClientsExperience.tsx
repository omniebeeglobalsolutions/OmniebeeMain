"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    name: "CEO of Halchemy Interiors, Hyderabad",
    text: "Partnering with this team for our enterprise software development was one of the best decisions we've made. From day one, they demonstrated an in-depth understanding of our business logic and delivered scalable backend systems with intuitive frontend interfaces. What truly stood out was their agile approach—frequent sprints, clear documentation, and seamless integrations. They were highly responsive to change requests and maintained excellent code quality throughout. The delivery was not just on time but exceeded our performance benchmarks.",
  },
  {
    name: "Manager at CTS, Bangalore",
    text: "We had a legacy software system that was becoming a bottleneck. The team helped us rebuild it from scratch using modern architecture and microservices. The transformation was unbelievable. Performance improved significantly, and downtime is now close to zero. What impressed us most was their professionalism, planning, and ability to communicate complex technical decisions in a simple manner. They also took complete ownership of DevOps and CI/CD setup.",
  },
  {
    name: "CTO at Floral",
    text: "Our goal was to build a secure financial dashboard with high-performance APIs. The team delivered a rock-solid platform that scaled flawlessly even under peak load. Their developers are proactive, experienced, and deeply focused on delivering results. They handled user authentication, data visualization, and compliance aspects with precision. We felt like we had an in-house team rather than an external vendor. Weekly reports, well-commented code, and quick turnarounds made the entire process transparent and efficient.",
  },
  {
    name: "CEO of Sarwave Solutions",
    text: "From requirement gathering to final delivery, the entire journey was smooth and collaborative. The custom software built by the team streamlined our internal operations and improved our response time to clients. Their developers were technically sound and brought a lot of creativity to the project, especially in implementing automation and real-time tracking features. We appreciated their transparency and regular updates. They also ensured that our product was future-ready and compatible with scaling across different platforms.",
  },
  {
    name: "Sr. Software Engineer at Adixxo",
    text: "We needed a cloud-native analytics platform, and this team took ownership from the ground up. Their understanding of scalable architectures and performance tuning is exceptional. They set up a clean codebase with modular components, automated testing, and seamless API integrations. The collaboration process was detailed—every sprint was documented and reviewed. Our internal stakeholders were impressed with the responsiveness and quality of output. It felt like working with a Silicon Valley-grade team, but at a fraction of the cost.",
  },
  {
    name: "MD at TechnoSoft Solutions",
    text: "The software development engagement with this team was both strategic and hands-on. They built a complex multi-tenant SaaS platform for us with detailed role-based access and real-time notifications. What impressed me was their strong architecture design and adherence to security best practices. They used the latest tech stack and maintained consistency across backend and frontend modules. Their sprint planning and retrospectives ensured minimal bugs and faster iteration.",
  },
];

export default function ClientExperienceSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const itemsPerSlide = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + itemsPerSlide) % testimonials.length);
        setFade(true);
      }, 300);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + itemsPerSlide
  );

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-20 bg-white">
      <h2 className="text-center font-poppins text-[#2E3E95] text-[24px] sm:text-[28px] font-bold mb-4 leading-snug">
        Clients Experience Says it all...
      </h2>
      <hr className="w-[120px] sm:w-[150px] mx-auto border-t-[3px] border-[#2e3e95] mb-6" />

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto transition-opacity duration-1000 ease-in-out ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {visibleTestimonials.map((client, idx) => (
          <div
            key={idx}
            className="relative w-full rounded-md overflow-hidden shadow-md flex flex-col"
          >
            {/* Background Image (optional): uncomment if needed
            <Image
              src={client.image}
              alt={client.name}
              fill
              className="object-cover opacity-30"
            /> */}

            <div className="bg-gradient-to-r from-[#2E3E95]/90 to-[#1E232A]/90 p-5 sm:p-6 md:p-6 text-white flex flex-col justify-between h-full">
              <p className="text-[14px] sm:text-[13px] md:text-[14px] leading-relaxed font-inter mb-4 whitespace-pre-line">
                <span className="text-[28px] font-serif leading-none text-white/60">“</span>
                {client.text}
                <span className="text-[28px] font-serif leading-none text-white/60">”</span>
              </p>
              <p className="text-[13px] sm:text-[14px] font-semibold mt-4 text-right">
                • {client.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
