import HeroSection from "./components/HeroSection";
import IntroSection from "./components/IntroSection";
import ExpertBrains from "./components/ExpertBrains";
import CareerOpportunitiesSection from "./components/CareerOpportunities/CareerOpportunitiesSection";
import ReviewsSection from "./components/EmployeeReviews/ReviewsSection";
import { getJobsData } from "../lib/api";

export const metadata = {
  title: "Careers | Omniebee Global Solutions",
  description:
    "Explore exciting career opportunities at Omniebee Global Solutions. Join a team of innovators and shape the future with us.",
  keywords: [
    "Omniebee careers",
    "tech jobs",
    "jobs at Omniebee",
    "Omniebee Global Solutions",
    "career opportunities",
    "software jobs",
    "frontend jobs",
    "react developer jobs",
  ],
  openGraph: {
    title: "Careers at Omniebee Global Solutions",
    description:
      "We're hiring! Check out open positions and grow your career with a leading tech company.",
    url: "https://omniebeeglobalsolutions.com/careers",
    siteName: "Omniebee Global Solutions",
    locale: "en_US",
    type: "website",
  },
};

export default async function CareersPage() {
  const jobs = await getJobsData();
  return (
    <main className="bg-white min-h-screen">
      <HeroSection />
      <IntroSection />
      <ExpertBrains />
      <CareerOpportunitiesSection jobs={jobs} />
      <div id="employee-review">
        <ReviewsSection />
      </div>
    </main>
  );
}
