"use client";
import React, { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import { assetsDataMap } from "@/app/utils/assetsDataMap";

const allReviews = [
  {
    name: "amoju karri",
    date: "08/05/2025",
    text: "Working at ominibee has been a truly rewarding experience. The leadership team is supportive, and there’s a strong culture of collaboration and innovation. I've had the opportunity to work on exciting projects with cutting-edge technologies, which has significantly contributed to my professional growth. Overall, it’s a great place to grow your career in tech.",
    avatar: assetsDataMap["Career-Person1"],
    blueTick: assetsDataMap["verify-tag"],
  },
  {
    name: "Anusha Muthya",
    date: "26/12/2024",
    text: "I approached this team with a freelancing project and was impressed by how quickly they understood my requirements. Their clear communication and grasp of the project needs gave me the confidence that they could execute it effectively.  I truly appreciate their professionalism and look forward to seeing the great work they deliver!",
    avatar: assetsDataMap["Career-Person2"],
    blueTick: assetsDataMap["verify-tag"],
  },
  {
    name: "Sathvika Jani",
    date: "15/11/2024",
    text: "I am very happy to have the opportunity to be part of Omniebee Global Solutions. The responsibilities and care you have entrusted to me are truly great, and I deeply appreciate the support and encouragement in my work. The work-life balance is respected, and the team genuinely values continuous learning.",
    avatar: assetsDataMap["Career-Person3"],
    blueTick: assetsDataMap["verify-tag"],
  },
  {
    name: "Vinay Goud",
    date: "20/10/2024",
    text: "Good working environment ,supporting management and team member s. Excellent environment for skill development. Teammates are supportive and the management is also helpful. Provided a quality service within the estimated timeline. Keep up the good work!",
    avatar: assetsDataMap["Career-Person4"],
    blueTick: assetsDataMap["verify-tag"],
  },
  {
    name: "Ravi Teja",
    date: "01/09/2024",
    text: "Great place to work with supportive leadership and plenty of learning opportunities. Had a talk with the team for a freelancing project and felt like, I have reached the right place. These guys actually know their stuff and seemed reliable. Keep up the good work ! 👍",
    avatar: assetsDataMap["Career-Person5"],
    blueTick: assetsDataMap["verify-tag"],
  },
  {
    name: "Kiranmai",
    date: "12/08/2024",
    text: "I am very happy to have the opportunity to be part of Omniebee Global Solutions. The responsibilities and care you have entrusted to me are truly great, and I deeply appreciate the support and encouragement in my work.  I truly appreciate their professionalism and look forward to seeing the great work they deliver!",
    avatar: assetsDataMap["Career-Person2"],
    blueTick: assetsDataMap["verify-tag"],
  },
];

const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3;
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + itemsPerSlide) % allReviews.length);
        setFade(true);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const visibleReviews = allReviews.slice(
    currentIndex,
    currentIndex + itemsPerSlide
  );

  return (
    <section
      className="py-8 px-2 md:px-4 max-w-[1200px] mx-auto w-full"
      style={{ background: "#F7F9FB" }}
    >
      <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-8 mb-6 md:mb-8 w-full">
        {/* Left: Rating summary */}
        <div className="flex flex-col items-center md:items-start justify-center md:justify-center min-w-[220px] max-w-[220px] w-full md:h-auto h-40 mx-auto md:mx-0">
          <span className="text-2xl font-bold text-[#222] mb-2 tracking-wide">
            EXCELLENT
          </span>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-[#FFD600] text-3xl leading-none">
                ★
              </span>
            ))}
          </div>
          <span className="italic text-base text-[#222] mb-2">
            Based on 24 Reviews
          </span>
          <img
            src={assetsDataMap["career-googleTwo"]}
            alt="Google"
            className="w-20 h-8 object-contain"
          />
        </div>

        {/* Right: Auto-Flipping Cards */}
        <div
          className={`flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full
            transition-opacity duration-700 ease-in-out ${
              fade ? "opacity-100" : "opacity-0"
            }`}
        >
          {visibleReviews.map((review, idx) => (
            <ReviewCard key={idx} {...review} googleLogo="/icons/google.png" />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-2 md:mt-4">
        <a
          href="https://share.google/t8JVU0S2brpjaPVQs"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#56B9F0] hover:bg-[#2E3E95] text-white font-semibold text-base md:text-lg px-6 sm:px-8 py-3 rounded-xl shadow transition-all w-full sm:w-auto text-center"
        >
          Click Here for Employee Reviews
        </a>
      </div>
    </section>
  );
};

export default ReviewsSection;
