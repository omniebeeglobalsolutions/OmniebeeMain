"use client";
import { assetsDataMap } from "@/app/utils/assetsDataMap";
import { useRouter } from "next/navigation";

type Job = {
  _id: string;
  title: string;
  postedDate: string;
  workExperience: number;
  industry: string;
  role: string;
  requirements?: string;
  whatYouWillDo?: string;
  whatYouWillBring?: string;
  location: string;
  jobType: string;
  __v: number;
};

type Props = {
  job?: Job;
  showInterestedButton?: boolean;
  applyUrl?: string;
};

const splitToBullets = (text?: string) => {
  if (!text) return null;
  return text
    .split(/\r?\n+/)
    .map((line, idx) => line.trim())
    .filter(Boolean);
};

const CareerById = ({ job, showInterestedButton = false, applyUrl }: Props) => {
  const requirements = splitToBullets(job?.requirements);
  const whatYouWillDo = splitToBullets(job?.whatYouWillDo);
  const whatYouWillBring = splitToBullets(job?.whatYouWillBring);

  const postedDate = job?.postedDate
    ? new Date(job.postedDate).toLocaleDateString()
    : "N/A";
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-[#f7f7f7] flex flex-col items-center py-8">
      {/* Banner/Header Section */}
      <div className="w-full max-w-5xl rounded-lg overflow-hidden relative mb-8">
        <div
          className="h-80 w-full bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${assetsDataMap["Career-JobDescription-Banner"]})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 flex flex-col justify-center items-center text-white p-8">
            <div className="text-[#FFFFFF] font-semibold mb-2">
              Omniebee Global Solutions | {job?.jobType || "Full time"}
            </div>
            <h1 className="text-4xl text-[#FFFFFF] font-semibold mb-2 text-center">
              {job?.title || "Senior Software Developer - I"}
            </h1>
            <div className="text-sm text-[#FFFFFF] font-semibold mb-4 text-center">
              {job?.location || "Hyderabad, India"} | Posted on {postedDate}
            </div>
            <div className="flex gap-4 mb-4">
              {showInterestedButton && (
                <button
                  className="px-6 py-2 rounded-full button-primary text-[#FFFFFF] font-semibold cursor-pointer"
                  onClick={() => router.push(applyUrl || "#")}
                >
                  I'm interested
                </button>
              )}
              <button
                className="px-6 py-2 rounded-full border border-white text-[#FFFFFF] font-semibold"
                onClick={() => {
                  const subject = encodeURIComponent(
                    "Check out this job opportunity"
                  );
                  const body = encodeURIComponent(
                    `I found this job and thought you might be interested:\n\n${window.location.href}`
                  );
                  window.location.href = `mailto:?subject=${subject}&body=${body}`;
                }}
              >
                Share job via email
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumbs */}
      {/* <div className="w-full max-w-5xl mx-auto px-4">
        <div className="text-sm text-[#FF6600] mb-2">
          Job listing <span className="mx-1">•</span>{" "}
          <span className="text-[#2E3E95]">Job details</span>
        </div>
      </div> */}
      {/* Main Content Section */}
      <div className="w-full max-w-5xl bg-white rounded-lg shadow flex flex-col md:flex-row p-8 gap-8">
        {/* Left: Job Description */}
        <div className="flex-1 min-w-0">
          <div className="mb-6">
            <div className="text-xl font-semibold text-[#479BC9] mb-2">
              Job Description
            </div>
            <div className="mb-2">
              <span className="font-bold text-[#000000]">About Omniebee</span>
            </div>
            <div className="mb-2 font-bold text-[#000000]">Who we are:</div>
            <div className="text-sm text-[#000000] mb-4">
              Ominebee Inc. is a premier global software products and services
              firm that specializes in providing innovative solutions and
              services for data-driven enterprises. Our focus is to empower
              businesses to achieve their digital transformation goals and
              maximize their business impact through the effective use of data
              and AI.  We leverage cutting-edge technologies in data analytics,
              data governance, AI-ML, GenAI/ LLM and industry best practices to
              deliver custom solutions that help organizations optimize their
              operations, enhance customer experiences, and drive growth.
            </div>
          </div>

          <div className="mb-6">
            <div className="font-bold mb-1 text-[#000000]">Working for us</div>
            <div className="text-sm text-[#000000] mb-2">
              Ominbee is rated 4.6/5 on Glass door, for many good reasons. We
              truly value our employees' growth, well-being, and diversity, and
              people’s experiences bear this out. At Ominbee, we offer a host of
              enticing benefits that create an environment where you can thrive
              both personally and professionally. From our inclusive hiring
              practices and mandatory training on creating a safe work
              environment to our flexible working hours and generous parental
              leave, we prioritize the well-being and success of our employees.
              Our commitment to professional development is evident through our
              mentorship programs, job training initiatives, and support for
              professional certifications. Additionally, our company-sponsored
              outings and various time-off benefits ensure a healthy work-life
              balance. Join us at Ominbee and become part of a vibrant and
              diverse community where your talents are recognized, your growth
              is nurtured, and your contributions make a real impact. See the
              benefits section below for the perks you’ll get while working for
              Ominbee.{" "}
            </div>
          </div>

          <div className="mb-6">
            <div className="font-bold text-[#000000] mb-1">Requirements</div>
            {requirements && requirements.length > 0 && (
              <ul className="list-disc pl-5 text-sm text-[#000000]">
                {requirements.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
            {(!requirements || requirements.length === 0) && (
              <ul className="list-disc pl-5 text-sm text-gray-700">
                <li>
                  3-5 years of experience in Banking, Financial services and
                  Insurance domain.
                </li>
              </ul>
            )}
          </div>

          <div className="mb-6">
            <div className="font-bold text-[#000000] mb-1">What you'll do</div>
            {whatYouWillDo && whatYouWillDo.length > 0 && (
              <ul className="list-disc pl-5 text-sm text-[#000000]">
                {whatYouWillDo.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
            {(!whatYouWillDo || whatYouWillDo.length === 0) && (
              <ul className="list-disc pl-5 text-sm text-gray-700">
                <li>
                  Leading requirement-gathering and digital transformation
                  consulting sessions
                </li>
                <li>Driving process analysis and documentation</li>
                <li>Leading ongoing reviews and optimization strategies</li>
                <li>Collaborating closely with development teams</li>
                <li>
                  Preparing documentation, KPIs, and functional specifications
                </li>
                <li>Experience in UAT testing</li>
                <li>Updating, implementing, and maintaining procedures</li>
                <li>Prioritizing initiatives based on business needs</li>
              </ul>
            )}
          </div>

          <div className="mb-6">
            <div className="font-bold mb-1">What you'll bring</div>
            {whatYouWillBring && whatYouWillBring.length > 0 && (
              <ul className="list-disc pl-5 text-sm text-[#000000]">
                {whatYouWillBring.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
            {(!whatYouWillBring || whatYouWillBring.length === 0) && (
              <ul className="list-disc pl-5 text-sm text-gray-700">
                <li>
                  A bachelor's degree in Tech or B. Tech and MBA [preferred]
                </li>
                <li>3-5 years of experience in business analysis</li>
                <li>Detail oriented, analytical and inquisitive</li>
                <li>Ability to work independently and with others</li>
                <li>Extremely organized with strong time-management skills</li>
              </ul>
            )}
          </div>

          {showInterestedButton && (
            <button
              className="px-6 py-2 rounded-full bg-[#56B9F0] text-white font-semibold mt-4 cursor-pointer"
              onClick={() => router.push(applyUrl || "#")}
            >
              Apply Now
            </button>
          )}
        </div>

        {/* Right: Job Information */}
        <div className="w-full md:w-80 flex-shrink-0 md:border-l md:border-gray-400 md:pl-6">
          <div className="text-lg font-semibold text-[#479BC9] mb-4">
            Job Information
          </div>
          <div className="text-sm mb-2">
            <span className="font-semibold text-[#2E3E95]">Date Opened</span>
            <br />
            {postedDate}
          </div>
          <div className="text-sm mb-2">
            <span className="font-semibold text-[#2E3E95]">Job Type</span>
            <br />
            {job?.jobType || "Full time"}
          </div>
          <div className="text-sm mb-2 ">
            <span className="font-semibold text-[#2E3E95]">
              Work Experience
            </span>
            <br />
            {job?.workExperience ? `${job.workExperience} years` : "3-5 years"}
          </div>
          <div className="text-sm mb-2  ">
            <span className="font-semibold text-[#2E3E95]">Industry</span>
            <br />
            {job?.industry || "IT Services"}
          </div>
          <div className="text-sm mb-2">
            <span className="font-semibold text-[#2E3E95]">City</span>
            <br />
            {job?.location?.split(",")[0] || "Hyderabad"}
          </div>
          <div className="text-sm mb-2">
            <span className="font-semibold text-[#2E3E95]">State/Province</span>
            <br />
            {job?.location?.split(",")[1]?.trim() || "Telangana"}
          </div>
          <div className="text-sm mb-2">
            <span className="font-semibold text-[#2E3E95]">Country</span>
            <br />
            {job?.location?.split(",")[2]?.trim() || "India"}
          </div>
          <div className="text-sm mb-2">
            <span className="font-semibold text-[#2E3E95]">
              Zip/Postal Code
            </span>
            <br />
            500001
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerById;
