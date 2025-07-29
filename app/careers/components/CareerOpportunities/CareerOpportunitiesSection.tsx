'use client';

import React, { useState } from 'react';
import JobCategory from './JobCategory';
import Filters from './Filters';

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

interface CareerOpportunitiesSectionProps {
  jobs?: Job[];
}

const CareerOpportunitiesSection = ({ jobs = [] }: CareerOpportunitiesSectionProps) => {
  const [department, setDepartment] = useState('All Departments');
  const [location, setLocation] = useState('All Locations');

  const grouped: { [industry: string]: Job[] } = jobs.reduce((acc: { [industry: string]: Job[] }, job) => {
    if (!acc[job.industry]) acc[job.industry] = [];
    acc[job.industry].push(job);
    return acc;
  }, {});

  const allDepartments = ['All Departments', ...Array.from(new Set(jobs.map(j => j.industry)))];
  const allLocations = ['All Locations', ...Array.from(new Set(jobs.map(j => j.location)))];

  const filteredGrouped = Object.entries(grouped)
    .map(([industry, jobsArr]) => ({
      industry,
      jobs: jobsArr.filter(job =>
        (department === 'All Departments' || job.industry === department) &&
        (location === 'All Locations' || job.location === location)
      ),
    }))
    .filter(cat => cat.jobs.length > 0);

  let runningIndex = 0;

  return (
    <section className="w-full pt-0 pb-8 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col items-center justify-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-blue-900">
          Career Opportunities
        </h2>
        <p className="border-2 border-blue-900 w-[130px] my-4"></p>
        <p className="text-lg text-center font-medium text-blue-900">
          Explore our open roles to take your career to the next level
        </p>
      </div>

      {/* Filters */}
      <div className="flex w-full mb-6">
        <div className="w-full flex flex-col sm:flex-row sm:justify-end">
          <Filters
            departments={allDepartments}
            locations={allLocations}
            department={department}
            setDepartment={setDepartment}
            location={location}
            setLocation={setLocation}
          />
        </div>
      </div>

      {/* Job Categories */}
      <div className="mt-6 space-y-8">
        {filteredGrouped.length === 0 ? (
          <div className="text-center text-gray-500">No jobs found for the selected filters.</div>
        ) : (
          filteredGrouped.map(cat => {
            const startIndex = runningIndex;
            runningIndex += cat.jobs.length;
            return (
              <JobCategory
                key={cat.industry}
                category={cat.industry}
                count={cat.jobs.length}
                jobs={cat.jobs}
                startIndex={startIndex}
              />
            );
          })
        )}
      </div>
    </section>
  );
};

export default CareerOpportunitiesSection;
