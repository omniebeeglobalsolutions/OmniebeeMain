"use client";
import { assetsDataMap } from "@/app/utils/assetsDataMap";
import { useEffect, useState } from "react";

export default function Topbar() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const handleTopbarVisibility = (e: any) => {
      setHide(e.detail);
    };

    window.addEventListener("topbar-visibility", handleTopbarVisibility);
    return () =>
      window.removeEventListener("topbar-visibility", handleTopbarVisibility);
  }, []);

  return (
    <div
      className={`hidden sm:block fixed top-0 left-0 w-full z-[100] bg-[#479BC999] px-4 py-4 transition-transform duration-500 ${
        hide ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <img
              src={assetsDataMap["phone-darklogo"]}
              className="w-4 h-4"
              alt="Phone"
            />
            <a
              href="tel:+919505637481"
              className="text-sm font-medium text-white nounderline transition-colors duration-200"
            >
              +91 9505637481
            </a>
          </div>
          <div className="flex items-center gap-2">
            <img
              src={assetsDataMap["email-darklogo"]}
              className="w-4 h-4"
              alt="Mail"
            />
            <a
              href="mailto:support@omniebeeglobalsolutions.com"
              className="text-sm font-medium text-white nounderline transition-colors duration-200"
            >
              support@omniebeeglobalsolutions.com
            </a>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/company/omniebee-global-solutions.com/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={assetsDataMap["linkedin-logo"]}
              alt="LinkedIn"
              className="w-6 h-6"
            />
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">
            <img
              src={assetsDataMap["facebook-logo"]}
              alt="Facebook"
              className="w-6 h-6"
            />
          </a>
          <a
            href="https://www.instagram.com/omniebee_global_solutions/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={assetsDataMap["insta-logo"]}
              alt="Instagram"
              className="w-6 h-6"
            />
          </a>

          {/* TODO: Uncomment when language selection is needed */}
          {/* <select className="bg-[#B0D4E8] text-sm px-2 py-1 rounded-md outline-none">
            <option>English</option>
            <option>Hindi</option>
          </select> */}
        </div>
      </div>
    </div>
  );
}
