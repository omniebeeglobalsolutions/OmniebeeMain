// import ClientsSSR from "./components/home/ClientsSSR";
// import HeroSection from "./components/home/HeroSection";
// import IndustrySolutions from "./components/home/IndustrySolutions";
// import Innovation from "./components/home/Innovation";
// import NextGenSolutions from "./components/home/NextGenSolutions";
// import OurServices from "./components/home/OurServices";
// import TeachStack from "./components/home/TeachStack";
// import { getInfoData } from "./lib/api";


// export default async function Home() {
//   const infoData = await getInfoData();
  
//   return (
//     <div>
    
//       <HeroSection />
//       <NextGenSolutions />
//       <IndustrySolutions />
//       <OurServices/>
//       <TeachStack/>
//       <ClientsSSR initialInfo={infoData}/>
//       <Innovation/>
   
//     </div>
//   );
// }




import type { Metadata } from "next";
import ClientsSSR from "./components/home/ClientsSSR";
import HeroSection from "./components/home/HeroSection";
import IndustrySolutions from "./components/home/IndustrySolutions";
import Innovation from "./components/home/Innovation";
import NextGenSolutions from "./components/home/NextGenSolutions";
import OurServices from "./components/home/OurServices";
import TeachStack from "./components/home/TeachStack";
import { getInfoData } from "./lib/api";
import { assetsDataMap } from "./utils/assetsDataMap";

// ✅ SEO metadata for home page
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Home",
    description:
      "Omniebee Global Solutions offers future-ready IT services in software development, digital transformation, and enterprise consulting.",
    openGraph: {
      title: "Home | Omniebee Global Solutions",
      description:
        "Future-ready IT services including custom software, consulting, and cloud solutions.",
      url: "https://omniebeeglobalsolutions.com",
      type: "website",
      siteName: "Omniebee Global Solutions",
      images: [
        {
          url: "https://res.cloudinary.com/dqgixj7vr/image/upload/v1752734391/upnr7ik4007ozok1bbwp.png" , // Replace with hero banner if available
          width: 600,
          height: 400,
          alt: "Omniebee Global Solutions Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Omniebee Global Solutions",
      description:
        "Delivering innovative digital and IT services for startups and enterprises.",
      images: ["https://res.cloudinary.com/dqgixj7vr/image/upload/v1752734391/upnr7ik4007ozok1bbwp.png"],
    },
  };
};

export default async function Home() {
  const infoData = await getInfoData();

  return (
    <div>
      <HeroSection />
      <NextGenSolutions />
      <IndustrySolutions />
      <TeachStack />
      <OurServices />
      <ClientsSSR initialInfo={infoData} />
      <Innovation />
    </div>
  );
}
