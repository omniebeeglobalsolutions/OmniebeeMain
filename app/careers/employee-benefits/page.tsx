import Counter from '@/app/components/reusable/counter';
import { assetsDataMap } from '@/app/utils/assetsDataMap';
import Link from 'next/link';
import React from 'react';

const teamImage = assetsDataMap["Group3"];
const profile1 = assetsDataMap["Anil-2"]
const profile2 = assetsDataMap["Sriram"]
const profile3 = assetsDataMap["Rakshii"]

const EmployeeBenefitsPage = () => {
  return (
    <div className="min-h-screen bg-white px-4 py-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row md:flex-row gap-8 mt-8">
          <div className="flex-1  ">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 ">
              Thrive on Innovation and Excellence: Craft
              Your Career Path With Ominebee!
            </h1>
            <Link href="./">
            <button className="button-primary hover:bg-[#2e3e95] text-white font-semibold px-8 py-3 rounded-lg text-lg transition flex items-center gap-2 mb-6 cursor-pointer">
              Explore Open Roles
              <span className="ml-2">→</span>
            </button>
            </Link>
          </div>
          <div className="flex-1">
            <p className="text-lg text-blue-900 max-w-xl sm:mt-2 sm:text-justify">
              We are fostering an environment where exceptional individuals can excel and innovate, shaping a future where every career flourishes. Join us to expand your horizons and contribute to groundbreaking solutions that redefine industries.
            </p>
          </div>
        </div>
        {/* Images Section */}
        <div className="relative flex flex-col items-center mt-16 mb-8">
          {/* Left Top Small Image */}
          <img
            src={profile1}
            alt="Profile 1"
            className="absolute left-0 top-0 w-28 h-28 rounded-2xl object-cover shadow-lg hidden md:block"
            style={{ transform: 'translate(-50%, 0)' }}
          />
          {/* Right Top Small Image */}
          <img
            src={profile2}
            alt="Profile 2"
            className="absolute right-0 top-0 w-28 h-28 rounded-2xl object-cover shadow-lg hidden md:block"
            style={{ transform: 'translate(50%, 0)' }}
          />
          {/* Left Bottom Small Image */}
          <img
            src={profile3}
            alt="Profile 3"
            className="absolute left-24 bottom-0 w-36 h-36 rounded-2xl object-cover shadow-lg hidden md:block"
            style={{ transform: 'translate(-60%, 30%)' }}
          />
          {/* Center Large Image */}
          <img
            src={teamImage}
            alt="Team"
            className="rounded-2xl shadow-lg w-full max-w-2xl object-cover"
          />
        </div>
      </div>
      {/* Second Section: Certification & Rating */}
      <div className="w-full bg-[#F2F7FC] py-12 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 px-4">
          {/* Left: Great Place to Work */}
          <div className="flex flex-col md:flex-row items-center flex-1 gap-6 md:gap-10">
            <img
              src={assetsDataMap["gptw-certified"]}
              alt="Great Place to Work Badge"
              className="w-32 h-auto mb-4 md:mb-0"
            />
            <div>
              <div className="text-sm text-blue-900 mb-1">WE ARE</div>
              <div className="text-3xl md:text-4xl font-bold text-blue-900 leading-tight">Great Place to<br />Work Certified</div>
            </div>
          </div>
          {/* Divider */}
          <div className="hidden md:block h-32 w-px bg-gray-300 mx-8" />
          {/* Right: Glassdoor */}
          <div className="flex flex-col md:flex-row items-center flex-1 gap-6 md:gap-10">
            <div className="flex flex-col items-center md:items-start">
              <div className="text-green-600 font-bold text-xl mb-1">'GLASSDOOR'</div>
              <div className="flex items-center mb-1">
                {/* Stars */}
                <span className="text-yellow-400 text-2xl mr-1">★</span>
                <span className="text-yellow-400 text-2xl mr-1">★</span>
                <span className="text-yellow-400 text-2xl mr-1">★</span>
                <span className="text-yellow-400 text-2xl mr-1">★</span>
                <span className="text-yellow-400 text-2xl mr-1">★</span>
                <span className="text-blue-900 text-lg font-semibold ml-2">4.7</span>
              </div>
            </div>
            <div>
              <div className="text-sm text-blue-900 mb-1">OUR REMARKABLE</div>
              <div className="text-3xl md:text-4xl font-bold text-blue-900 leading-tight">Rating Speaks<br />Volumes</div>
            </div>
          </div>
        </div>
      </div>
      {/* Third Section: Our Core Values */}
      <div className="w-full py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:items-center">
          {/* Left: Heading and Description */}
          <div className="flex-1 mb-8 lg:mb-0 lg:pr-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-2">Our Core Values</h2>
            <div className="text-xl font-semibold text-blue-900 mb-2">Our values drive everything we do!</div>
            <p className="text-lg text-blue-900 max-w-lg">
              They’re the DNA of our team, the spark that ignites our passion, and the compass guiding us towards a future we’re all excited to build together.
            </p>
          </div>
          {/* Right: Values Grid, 2 rows x 3 columns */}
          <div className="flex-[2] flex flex-col gap-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Row 1 */}
              <div className="bg-[#F2F7FC] rounded-2xl p-6 text-blue-900 shadow-sm">
                <div className="font-bold text-lg mb-2">Trust</div>
                <div>We build lasting partnerships through open communication and transparency, fostering an environment where everyone feels valued and heard.</div>
              </div>
              <div className="bg-[#F2F7FC] rounded-2xl p-6 text-blue-900 shadow-sm">
                <div className="font-bold text-lg mb-2">Excellence</div>
                <div>We deliver exceptional results, exceeding client expectations and constantly pushing the boundaries of what’s possible.</div>
              </div>
              <div className="bg-[#F2F7FC] rounded-2xl p-6 text-blue-900 shadow-sm">
                <div className="font-bold text-lg mb-2">Accountability</div>
                <div>We take ownership of our work, holding ourselves responsible for achieving goals and delivering on promises.</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Row 2 */}
              <div className="bg-[#F2F7FC] rounded-2xl p-6 text-blue-900 shadow-sm">
                <div className="font-bold text-lg mb-2">Collaboration</div>
                <div>We thrive in a team-oriented environment, fostering open communication and shared purpose to achieve collective success.</div>
              </div>
              <div className="bg-[#F2F7FC] rounded-2xl p-6 text-blue-900 shadow-sm">
                <div className="font-bold text-lg mb-2">Innovation</div>
                <div>We embrace creativity and out-of-the-box thinking, continuously seeking new solutions to drive progress and growth.</div>
              </div>
              <div className="bg-[#F2F7FC] rounded-2xl p-6 text-blue-900 shadow-sm">
                <div className="font-bold text-lg mb-2">Gratitude</div>
                <div>We appreciate the trust and support we receive from our colleagues, mentors, and clients, striving to exceed their expectations through dedication and excellence.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Fourth Section: Life at Kanerika */}
      <div className="w-full bg-[#F2F7FC] py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div className="flex flex-col items-center gap-8">
            {/* Top Large Image */}
            <img
              src={assetsDataMap["Group1"]} // Table tennis placeholder
              alt="Table Tennis"
              className="rounded-2xl w-full max-w-md object-cover"
            />
            {/* Testimonial Card 1 */}
            <div className="relative w-full max-w-md">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <img
                  src={assetsDataMap["anusha"]}
                  alt="Pavithra"
                  className="w-20 h-20 rounded-full border-4 border-white bg-blue-200 shadow-lg object-cover"
                />
              </div>
              <div className="bg-white rounded-2xl shadow p-8 pt-14">
                <p className="text-blue-900 text-left sm:text-left text-md mb-4">
                  The most rewarding part of #LifeatOmniebee is the collaborative environment. Everyone is genuinely invested in helping each other succeed, which fosters a sense of community and shared purpose.
                </p>
                <div className="font-bold text-blue-900">Anusha</div>
                <div className="text-blue-900">Talent Acquisition Lead</div>
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div className="flex flex-col gap-8">
            {/* Heading and Description */}
            <div className="mb-4">
              <h2 className="text-4xl font-bold text-blue-900 mb-2">Life at Omniebee</h2>
              <div className="text-2xl font-semibold text-blue-900 mb-2">
                Your best work <span className="text-orange-500 font-bold">starts with you</span>
              </div>
              <p className="text-lg text-blue-900 max-w-xl">
                We know you already have the potential for incredible things. Here, we provide the spark, the support, and the stage to ignite your passion and turn your potential into reality.
              </p>
            </div>
            {/* Testimonial Card 2 */}
            <div className="relative w-full max-w-xl self-end">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 lg:left-auto lg:-right-10 lg:translate-x-0">
                <img
                  src={assetsDataMap["anil"]}
                  alt="Sriram"
                  className="w-20 h-20 rounded-full border-4 border-white bg-blue-200 shadow-lg object-cover"
                />
              </div>
              <div className="bg-white rounded-2xl shadow p-8 pt-14">
                <p className="text-blue-900 mb-4 text-left text-md">
                  Throughout my career, I've valued strong leadership and opportunities for continuous learning. I've found both here. We have exceptional leaders who empower us to take ownership and push boundaries, while also fostering a culture of continuous learning and development. It's truly rewarding to be part of a team that constantly challenges and inspires me to grow.
                </p>
                <div className="font-bold text-blue-900">Anil</div>
                <div className="text-blue-900">HR Manager</div>
              </div>
            </div>
            {/* Bottom Large Image */}
            <img
              src={assetsDataMap["Group2"]} // Skydiving placeholder
              alt="Skydiving"
              className="rounded-2xl w-full max-w-md object-cover self-end"
            />
          </div>
        </div>
      </div>
      {/* Fifth Section: Employee Experience, Diversity, Equity, Inclusion, POSH */}
      <div className="w-full bg-[#F2F7FC] py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Row 1 */}
          {/* Left Card: Text left, image right, vertically centered */}
          <div className="bg-[#E6F1FC] rounded-2xl p-8 flex h-[340px] flex-row items-center">
            <div className="flex-1">
              <div className="font-bold text-xl text-blue-900 mb-2">Prioritizing Employee Experience</div>
              <div className="text-blue-900 text-base">
                Our strength is a diverse team, turning visions into reality through support, feedback, and learning.
              </div>
            </div>
            <div className="flex items-center ml-4">
              <img
                src={assetsDataMap["Sriram-2"]}
                alt="Employee"
                className="w-28 h-32 object-cover rounded-2xl shadow-lg bg-white border-4 border-white"
                style={{ objectPosition: 'top' }}
              />
            </div>
          </div>
          {/* Center Card: Text top, image bottom, centered */}
          <div className="bg-white rounded-2xl p-8 flex flex-col h-[340px] justify-between">
            <div>
              <div className="font-bold text-xl text-blue-900 mb-2">Women At Omniebee</div>
              <div className="text-blue-900 text-base mb-4">
                We commit to equal opportunities, celebrating women’s achievements & ensuring equal representation.
              </div>
            </div>
            <div className="flex justify-center items-end">
              <img
                src={assetsDataMap["anusha"]}
                alt="Employee"
                className="w-28 h-32 object-cover rounded-2xl shadow-lg bg-white border-4 border-white"
                style={{ objectPosition: 'top' }}
              />
            </div>
          </div>
          {/* Right Card: Text only */}
          <div className="bg-[#E6F1FC] rounded-2xl p-8 flex flex-col h-[340px] justify-center">
            <div className="font-bold text-xl text-blue-900 mb-2">Inclusion</div>
            <div className="text-blue-900 text-base">
              We ensure a fair, supportive, and discrimination-free culture for everyone to thrive.
            </div>
          </div>
          {/* Row 2 */}
          <div className="bg-white rounded-2xl p-8 flex flex-col h-[200px]">
            <div className="font-bold text-xl text-blue-900 mb-2">Diversity</div>
            <div className="text-blue-900 text-base">
              We value diversity in ethnicity, gender, and background to foster innovation and inclusivity.
            </div>
          </div>
          <div className="bg-[#E6F1FC] rounded-2xl p-8 flex flex-col h-[200px]">
            <div className="font-bold text-xl text-blue-900 mb-2">Equity</div>
            <div className="text-blue-900 text-base">
              Our culture ensures fairness and equal opportunity in a supportive, discrimination-free environment.
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 flex flex-col h-[200px]">
            <div className="font-bold text-xl text-blue-900 mb-2">POSH at Omniebee</div>
            <div className="text-blue-900 text-base">
              Our policies ensure a safe, harassment-free workplace with a dedicated committee, and confidential reporting.
            </div>
          </div>
        </div>
      </div>
      {/* Fun Stats Section */}
      <div className="w-full bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {/* Cups of Coffee */}
          <div className="flex flex-col items-center">
            {/* Coffee Icon */}
            <img src={assetsDataMap["coffee"]}  width={50} height={50} />
            <Counter end={12385} />
            <div className="text-lg text-blue-900 mt-2">Cups of Coffee Drunk</div>
          </div>
          {/* Meetings */}
          <div className="flex flex-col items-center">
            {/* Team Icon */}
            <img src={assetsDataMap["meetings"]} alt="" width={50} height={50} />
            <Counter end={6587} />
            <div className="text-lg text-blue-900 mt-2">Meetings Spent on Teams</div>
          </div>
          {/* High-Fives */}
          <div className="flex flex-col items-center">
            {/* Sparkler Icon */}
            <img src={assetsDataMap["highfives"]} alt="" width={50} height={50} />
            <Counter end={875} />
            <div className="text-lg text-blue-900 mt-2">Celebratory Team High-Fives</div>
          </div>
          {/* Sticky Notes */}
          <div className="flex flex-col items-center">
            {/* Sticky Note Icon */}
            <img src={assetsDataMap["stickynotes"]} alt="" width={50} height={50} />
            <Counter end={15680} />
            <div className="text-lg text-blue-900 mt-2">Sticky Notes Used for Brainstorming</div>
          </div>
        </div>
      </div>
      {/* Employee Benefits Cards Section */}
      <div className="w-full bg-white py-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-900">
          Discovering Employee <span className="text-orange-500">Benefits</span>
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="bg-[#E6F1FC] rounded-2xl p-8 flex flex-col items-center text-center">
            {/* Badge Icon */}
            <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><rect x="10" y="12" width="28" height="24" rx="3" stroke="#0A3970" strokeWidth="2" /><rect x="18" y="18" width="12" height="4" rx="2" fill="#0A3970" /><circle cx="24" cy="28" r="2" fill="#0A3970" /></svg>
            <div className="font-bold text-xl text-blue-900 mt-4">Annual<br />Appraisal Cycle</div>
          </div>
          {/* Card 2 */}
          <div className="bg-[#E6F1FC] rounded-2xl p-8 flex flex-col items-center text-center">
            {/* Clock Icon */}
            <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><circle cx="24" cy="24" r="18" stroke="#0A3970" strokeWidth="2" /><path d="M24 16v8l6 4" stroke="#0A3970" strokeWidth="2" strokeLinecap="round" /></svg>
            <div className="font-bold text-xl text-blue-900 mt-4">Flexible Work<br />Schedules</div>
          </div>
          {/* Card 3 */}
          <div className="bg-[#E6F1FC] rounded-2xl p-8 flex flex-col items-center text-center">
            {/* Money Icon */}
            <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><rect x="8" y="16" width="32" height="16" rx="3" stroke="#0A3970" strokeWidth="2" /><rect x="16" y="20" width="8" height="4" rx="2" fill="#0A3970" /><circle cx="32" cy="24" r="2" fill="#0A3970" /></svg>
            <div className="font-bold text-xl text-blue-900 mt-4">Upskilling &<br />Career Development</div>
          </div>
          {/* Card 4 */}
          <div className="bg-[#E6F1FC] rounded-2xl p-8 flex flex-col items-center text-center">
            {/* Gift Icon */}
            <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><rect x="10" y="20" width="28" height="16" rx="3" stroke="#0A3970" strokeWidth="2" /><rect x="10" y="16" width="28" height="8" rx="2" fill="#E6F1FC" stroke="#0A3970" strokeWidth="2" /><path d="M24 16v20" stroke="#0A3970" strokeWidth="2" /><circle cx="18" cy="16" r="3" stroke="#0A3970" strokeWidth="2" /><circle cx="30" cy="16" r="3" stroke="#0A3970" strokeWidth="2" /></svg>
            <div className="font-bold text-xl text-blue-900 mt-4">Reimbursed<br />Certification Costs</div>
          </div>
          {/* Card 5 */}
          <div className="bg-[#E6F1FC] rounded-2xl p-8 flex flex-col items-center text-center">
            {/* Shield Icon */}
            <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><path d="M24 8l14 6v8c0 10-6 16-14 18-8-2-14-8-14-18v-8l14-6z" stroke="#0A3970" strokeWidth="2" fill="#E6F1FC" /><path d="M24 20v6" stroke="#0A3970" strokeWidth="2" /><circle cx="24" cy="28" r="2" fill="#0A3970" /></svg>
            <div className="font-bold text-xl text-blue-900 mt-4">Comprehensive Health<br />& Life Insurance</div>
          </div>
          {/* Card 6 */}
          <div className="bg-[#E6F1FC] rounded-2xl p-8 flex flex-col items-center text-center">
            {/* Graduation Cap Icon */}
            <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><path d="M8 20l16-8 16 8-16 8-16-8z" stroke="#0A3970" strokeWidth="2" fill="#E6F1FC" /><path d="M24 28v-8" stroke="#0A3970" strokeWidth="2" /><path d="M16 32c0-2.2 3.6-4 8-4s8 1.8 8 4" stroke="#0A3970" strokeWidth="2" /></svg>
            <div className="font-bold text-xl text-blue-900 mt-4">Enhanced Learning<br />Opportunities</div>
          </div>
          {/* Card 7 */}
          <div className="bg-[#E6F1FC] rounded-2xl p-8 flex flex-col items-center text-center">
            {/* Money Icon */}
            <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><rect x="8" y="16" width="32" height="16" rx="3" stroke="#0A3970" strokeWidth="2" /><rect x="16" y="20" width="8" height="4" rx="2" fill="#0A3970" /><circle cx="32" cy="24" r="2" fill="#0A3970" /></svg>
            <div className="font-bold text-xl text-blue-900 mt-4">Employee Pension<br />Scheme</div>
          </div>
          {/* Card 8 */}
          <div className="bg-[#E6F1FC] rounded-2xl p-8 flex flex-col items-center text-center">
            {/* Hands Icon */}
            <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><path d="M16 32v-8c0-4 8-4 8 0v8" stroke="#0A3970" strokeWidth="2" /><path d="M32 32v-8c0-4-8-4-8 0v8" stroke="#0A3970" strokeWidth="2" /></svg>
            <div className="font-bold text-xl text-blue-900 mt-4">Gratuity Benefits</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmployeeBenefitsPage;