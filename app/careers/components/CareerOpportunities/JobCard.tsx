type Props = {
  title: string;
  location: string;
  jobType: string;
};

const JobCard = ({ title, location, jobType }: Props) => (
  <div className="border  border-[#56B9F0] rounded-lg p-4 bg-[#F4F4FF] transition flex flex-col md:items-start items-center min-h-[120px]">
    <div className="text-xs text-[#6B7280] mb-1 w-full md:text-left text-center">{jobType}</div>
    <div className="font-bold text-[#2E3E95] text-lg md:text-xl mb-1 w-full md:text-left text-center truncate">{title}</div>
    <div className="text-xs text-[#6B7280] mb-1 w-full md:text-left text-center">{location}</div>
  </div>
);

export default JobCard; 