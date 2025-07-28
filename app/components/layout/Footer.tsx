"use client";
import { assetsDataMap } from "@/app/utils/assetsDataMap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const INFO_API_URL = "https://omniebee-server.vercel.app/api/info";

const servicesRoute = [
  { name: "Sofware Development", id: "6879f664ff8f487cbd3cf2c2" },
  { name: "IT Consulting", id: "687a04e6ff8f487cbd3cf2d3" },
  { name: "Business Consulting", id: "687a112eff8f487cbd3cf2dd" },
  { name: "Technical Support", id: "6879fa0bff8f487cbd3cf2ca" },
  { name: "Staffing Solutions", id: "687a09c0ff8f487cbd3cf2d8" },
  { name: "Training", id: "687a2e24e7dd05494d3087d9" },
];

const industryRoutes = [
  { label: "Healthcare", slug: "healthcare" },
  { label: "Retail & E-Commerce", slug: "retailandecommerce" },
  { label: "Banking & Finance", slug: "bankingandfinance" },
  { label: "AgriTech", slug: "agritech" },
  { label: "Travel & Tourism", slug: "travelandtourism" },
  { label: "Education", slug: "education" },
];

const Footer = () => {
  const [location, setLocation] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function fetchLocation() {
      try {
        const res = await fetch(INFO_API_URL);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0 && data[0].location) {
          setLocation(data[0].location);
        }
      } catch (e) {
        setLocation(null);
      }
    }
    fetchLocation();
  }, []);

  const handleSubscribe = () => {
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }
    if (!/^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      toast.error("Enter a valid email address.");
      return;
    }
    if (/[^a-zA-Z0-9@._]/.test(email)) {
      toast.error("Email should not contain special characters except @ . _ ");
      return;
    }
    // Here you can add your API call to subscribe the email if needed
    toast.success("Subscribed successfully!");
    setEmail("");
  };

  return (
    <footer className="relative w-full bg-gradient-to-b from-[#1E232A] to-[#2e3e95] text-[#fff] px-6 sm:px-12 pt-10 pb-4 ">
      <Toaster position="top-center" />
      <div className="absolute inset-0 bg-[url('/icons/footerbg.png')] bg-cover bg-center opacity-25" />
      <div className="relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b border-gray-300 pb-10">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={assetsDataMap["OGS-Favicon"]}
                alt="Logo"
                width={50}
                height={50}
                style={{ borderRadius: "10%" }}
              />
              <div className="w-[1px] h-10 bg-gray-400" />
              <h2 className="font-bold text-[#479BC9] text-lg leading-tight">
                Omniebee
                <br style={{ color: "white" }} />
                Global Solutions
              </h2>
            </div>

            <p className="mt-4 text-sm text-[#fff] leading-relaxed text-justify w-[340px]">
              Omniebee Global Solutions is a results-driven IT services company,
              delivering excellence in web and software development, cloud
              integration, UI/UX design, and full-stack consulting. We are
              committed to empowering businesses through smart, scalable, and
              secure technology solutions that drive performance and digital
              transformation.
            </p>

            <div className="mt-6">
              <p className="font-medium mb-2 text-[#56B9F0]">
                Get Newsletters & Subscriptions
              </p>
              <div className="flex items-center w-[700px] border-[2.5px] border-[#fff] rounded-full overflow-hidden max-w-xs bg-white">
                <input
                  type="email"
                  placeholder="Enter your mail"
                  className="px-4 py-2 w-full outline-none text-sm bg-white text-black placeholder-opacity-50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="button-primary text-white text-sm px-5 py-2 rounded-full text-center font-semibold cursor-pointer transition-colors duration-200"
                  onClick={handleSubscribe}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

         <div className="sm:ml-6 md:ml-10 lg:ml-16">
            <h3 className="font-bold mb-2 text-lg">Services</h3>
            <div className="w-22 h-[2px] bg-[#fff] mb-6" />

            <ul className="space-y-3 text-sm">
              {servicesRoute.map((service) => (
                <li key={service.name}>
                  <Link
                    href={`/whatwedo/services/${service.id}`}
                    className="hover:text-[#56B9F0] transition-colors duration-200 hover:font-semibold"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2 text-lg">Industries</h3>
            <div className="w-22 h-[2px] bg-[#fff] mb-6" />

            <ul className="space-y-3 text-sm">
              {industryRoutes.map((industry) => (
                <li key={industry.slug}>
                  <Link
                    href={`/whatwedo/industries/${industry.slug}`}
                    className="hover:text-[#56B9F0] transition-colors duration-200 hover:font-semibold"
                  >
                    {industry.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-xl mb-4">Our Location</h3>
              <div className="w-22 h-[2px] bg-[#fff] mb-6" />

              <div className="flex items-start gap-4 mb-6">
                <Image
                  src={assetsDataMap["phone-logo"]}
                  alt="Phone"
                  width={32}
                  height={32}
                />
                <div>
                  <p className="text-xs font-semibold mb-1">Call for Support</p>
                  <a
                    href="tel:+919505637481"
                    className="text-sm font-medium text-white-600 nounderline hover:text-[#56B9F0] transition-colors duration-200"
                  >
                    +91 9505637481
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 mb-6">
                <Image
                  src={assetsDataMap["mail-logo"]}
                  alt="Email"
                  width={32}
                  height={32}
                />
                <div>
                  <p className="text-xs font-semibold mb-1">Email Us</p>
                  <a
                    href="mailto:support@omniebeeglobalsolutions.com"
                    className="text-sm font-medium text-white-600 nounderline hover:text-[#56B9F0] transition-colors duration-200"
                  >
                    support@omniebeeglobalsolutions.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <Image
                  src={assetsDataMap["location-logo"]}
                  alt="Location"
                  width={32}
                  height={32}
                />
                <div>
                  <p className="text-xs font-semibold mb-1">Address</p>
                  <p className="text-sm font-medium hover:text-[#56B9F0] transition-colors duration-200 cursor-pointer">
                    {location}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Us Button */}
            <div className="mt-2 mb-4">
              <Link href="/contact">
                <button className="bg-[#56B9F0] text-white text-sm px-6 py-2 rounded-full w-fit font-bold cursor-pointer shadow-md hover:bg-[#2e3e95] transition-colors duration-200 flex items-center justify-center">
                  Contact Us
                </button>
              </Link>
            </div>

            {/* Social Icons */}
            <div className="mt-2 flex">
              <p className="font-medium sm:mt-[8px] mt-[8px] mb-2 text-sm">Follow Us:</p>
              <div className="ml-2 flex items-center gap-5">
                <a
                  href="https://www.linkedin.com/company/omniebee-global-solutions.com/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={assetsDataMap["linkedin-logo"]}
                    alt="LinkedIn"
                    width={28}
                    height={28}
                  />
                </a>
                <a
                  href="https://www.facebook.com/people/Web-Eclipse/pfbid0yjLh2Jg1SfKRXqVptn5RvvLVaZ8xNAXZwv2q4rhKr1pxTjyg9M7iQWVe2Ksbetm5l/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={assetsDataMap["facebook-logo"]}
                    alt="Facebook"
                    width={28}
                    height={28}
                  />
                </a>
                <a
                  href="https://www.instagram.com/omniebee_global_solutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={assetsDataMap["insta-logo"]}
                    alt="Instagram"
                    width={28}
                    height={28}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center pt-6 text-xs text-[#fff] gap-4">
          <p>Made with ❤️ | Copyright ©2025 Omniebee Global Solutions | All Rights Reserved</p>
          <div className="flex gap-4">
            <Link href="/privacy-and-policy">
              <span className="text-[#fff] hover:text-[#56B9F0] transition-colors duration-200 cursor-pointer font-bold">
                Privacy Policy
              </span>
            </Link>
            <Link href="/terms-and-conditions">
              <span className="text-[#fff] hover:text-[#56B9F0] transition-colors duration-200 cursor-pointer font-bold">
                Terms and Conditions
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
