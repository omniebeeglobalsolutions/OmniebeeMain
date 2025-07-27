import React from 'react';
import JobCard from './CareerOpportunities/JobCard';

type Job = {
  type: string;
  title: string;
  location: string;
  mode: string;
};

type Props = {
  category: string;
  count: number;
  jobs: Job[];
};


const JobCategory = ({ category, count, jobs }: Props) => (
  <div className="mb-8">
    <div className="flex items-center mb-4 ml-2">
      <h3 className="text-2xl md:text-3xl font-bold mr-3" style={{ color: '#2E3E95' }}>{category}</h3>
      <span className="bg-[#56B9F0] text-white text-xs md:text-sm px-3 py-1 rounded-full font-semibold">{count} Jobs</span>
    </div>
    <div className="overflow-x-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {jobs.map((job, idx) => {
          const { title, location, jobType = 'Full Time' } = job as any;
          return (
            <JobCard key={idx} title={title} location={location} jobType={jobType} />
          );
        })}
      </div>
    </div>
  </div>
);

export default JobCategory; 