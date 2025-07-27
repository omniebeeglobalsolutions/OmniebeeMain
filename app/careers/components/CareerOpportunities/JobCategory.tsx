"use client";

import React, { useState } from "react";
import JobCard from "./JobCard";
import Link from "next/link";

type Job = {
  _id: string;
  title: string;
  postedDate: string;
  workExperience: number;
  industry: string;
  role: string;
  whatYouWillDo: string;
  whatYouWillBring: string;
  location: string;
  jobType: string;
  __v: number;
};

type Props = {
  category: string;
  count: number;
  jobs: Job[];
  startIndex: number;
};

const JobCategory = ({ category, count, jobs, startIndex }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <div className="flex items-center mb-2 relative">
        <h3 className="text-xl font-semibold text-blue-800 mr-2 font-poppins">
          {category}
        </h3>
        <span
          className="relative bg-[#2E3E95] text-white text-xs px-3 py-1 rounded-full transition-transform duration-300 inline-block overflow-visible font-semibold"
          onMouseEnter={() => setIsHovered(true)}
          onAnimationEnd={() => setIsHovered(false)}
        >
          {count} Jobs
          {isHovered && (
            <>
              <span className="star star1">✨</span>
              <span className="star star2">✨</span>
              <span className="star star3">✨</span>
            </>
          )}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-[900px] px-4 pt-3">
        {jobs.map((job) => (
          <Link key={job._id} href={`/careers/job/${job._id}`}>
            <JobCard
              title={job.title}
              location={job.location}
              jobType={job.jobType}
            />
          </Link>
        ))}
      </div>

      <style jsx>{`
        .star {
          position: absolute;
          font-size: 14px;
          opacity: 0;
          animation: sparkle 0.6s ease-out forwards;
        }
        .star1 {
          top: -6px;
          right: -6px;
          animation-delay: 0s;
        }
        .star2 {
          top: -10px;
          right: 8px;
          animation-delay: 0.1s;
        }
        .star3 {
          top: 4px;
          right: -10px;
          animation-delay: 0.2s;
        }

        @keyframes sparkle {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.2) rotate(20deg);
          }
          100% {
            opacity: 0;
            transform: scale(0.7) rotate(45deg);
          }
        }
      `}</style>
    </div>
  );
};

export default JobCategory;
