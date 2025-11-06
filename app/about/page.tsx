import AboutUs from "./Components/AboutUs";
import AnimatedBubbles from "./Components/AnimatedBubbles";
import StatsSection from "./Components/AnnualGrowth";
import ClientExperienceSection from "./Components/ClientsExperience";
import GrowthJourneySection from "./Components/GrowthJourneySection";
// import LeadershipSection from "./Components/leadership";
import OurStorySection from "./Components/OurStorySection";
import ValuesMissionVisionSection from "./Components/ValuesMission";

export const metadata = {
  title: "About Us | Omniebee Global Solutions",
  description:
    "Discover the journey, values, and leadership behind Omniebee Global Solutions. Learn how we are shaping the tech world with innovation and purpose.",
  keywords: [
    "About Omniebee",
    "Omniebee Global Solutions",
    "Omniebee story",
    "Omniebee leadership",
    "mission and values",
    "tech company vision",
    "innovation team",
  ],
  openGraph: {
    title: "About Omniebee Global Solutions",
    description:
      "Get to know our journey, mission, and the leadership that drives Omniebee Global Solutions forward.",
    url: "https://omniebeeglobalsolutions.com/about",
    siteName: "Omniebee Global Solutions",
    // images: [
    //   {
    //     url: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/your-folder/og-about.jpg", // ✅ Replace this with your Cloudinary OG image
    //     width: 1200,
    //     height: 630,
    //     alt: "About Omniebee Global Solutions",
    //   },
    // ],
    locale: "en_US",
    type: "website",
  },
};

export default function AboutPage() {
  let data = 'som ething'
  return (
    <div>
   
     <AboutUs/>
     <OurStorySection />
     <GrowthJourneySection/>
     <StatsSection/>
     <ValuesMissionVisionSection/>
     <ClientExperienceSection/>
     {/* <LeadershipSection/> */}

    </div>
  );
}
