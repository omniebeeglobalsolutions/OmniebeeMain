// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import Topbar from "./components/layout/Topbar";
// import Navbar from "./components/layout/Navbar";
// import Footer from "./components/layout/Footer";
// import { assetsDataMap } from "./utils/assetsDataMap";

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: "Omniebee Global Solutions",
//   description: "Building Future-Ready IT Solutions",
//   icons: {
//   icon: assetsDataMap["OGS_Darklogo"] || undefined,
// }
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" style={{ scrollBehavior: 'smooth' }}>
//       <body className={inter.className}>
//         <Topbar/>
//         <Navbar/>
//         <main className="pt-28">{children}</main>
//         <Footer/>

//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Topbar from "./components/layout/Topbar";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { assetsDataMap } from "./utils/assetsDataMap";
import Head from "next/head";
import MoveToTopButton from "./components/layout/MoveToTopButton";

const inter = Inter({ subsets: ["latin"] });

const siteURL = "https://omniebeeglobalsolutions.com";
const siteName = "Omniebee Global Solutions";
const siteDescription =
  "Omniebee Global Solutions offers future-ready IT solutions, including custom software development, digital transformation, and consulting services for startups and enterprises.";

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Omniebee Global Solutions",
    "Future-Ready IT Solutions",
    "Custom Software Development",
    "Digital Transformation Services",
    "Startup Software Services",
    "Enterprise IT Consulting",
    "Product Engineering",
    "Web & Mobile App Development",
    "Tech Startup Partner",
    "AI and Automation Solutions",
    "Business Software Hyderabad",
    "Cloud Services",
    "Digital Product Design",
    "SaaS Solutions",
    "Hyderabad IT Company",
  ],
  metadataBase: new URL(siteURL),
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: siteURL,
    siteName: siteName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: assetsDataMap["OGS_Darklogo"] || "",
        width: 400,
        height: 400,
        alt: "Omniebee Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [assetsDataMap["OGS_Darklogo"] || ""],
  },
  icons: {
    icon: '/faviconborder.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={siteURL} />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#0E1A2B" />
        <link rel="icon" type="image/png" href="/faviconborder.png" />
        <link rel="shortcut icon" type="image/png" href="/faviconborder.png" />
        {/* JSON-LD Organization Schema for Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Omniebee Global Solutions",
              url: siteURL,
              logo: assetsDataMap["OGS_Darklogo"] || "",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+91 9556355752",
                  contactType: "Customer Support",
                  areaServed: "IN",
                  availableLanguage: ["English", "Hindi", "Telugu"],
                },
              ],
              sameAs: [
                "https://www.linkedin.com/company/omniebee",
                "https://www.instagram.com/omniebee",
              ],
            }),
          }}
        />
      </Head>
      <body className={inter.className}>
        <Topbar />
        <Navbar />
        <main className="sm:pt-28 pt-20">{children}</main>
        <Footer />
        <MoveToTopButton />
      </body>
    </html>
  );
}
