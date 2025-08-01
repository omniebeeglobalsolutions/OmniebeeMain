"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { assetsDataMap } from "@/app/utils/assetsDataMap";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  {
    href: "/",
    label: "What We Do?",
    children: [
      {
        type: "services",
        heading: "Services",
        description:
          "End-to-end technology solutions including mobile app development, IT consulting, technical support, and more to turn your ideas into scalable digital products.",
        items: [
          { label: "Software Development" },
          { label: "IT Consulting" },
          { label: "Business Consulting" },
          { label: "Technical Support" },
          { label: "Staffing Solutions" },
          { label: "Training" },
        ],
      },
      {
        type: "industries",
        heading: "Industries",
        description:
          "Tailored IT services for key industries like healthcare, retail, e-commerce, and education, helping businesses modernize operations and drive growth.",
        items: [
          { label: "Healthcare" },
          { label: "Retail & E-Commerce" },
          { label: "Banking & Finance" },
          { label: "AgriTech" },
          { label: "Travel & Tourism" },
          { label: "Education" },
        ],
      },
    ],
  },
  { href: "https://portfolio-omniebeeglobalsolutions.com/", label: "Portfolio" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact Us" },
];

const servicesMap: Record<string, string> = {
  "Software Development": "6879f664ff8f487cbd3cf2c2",
  "IT Consulting": "687a04e6ff8f487cbd3cf2d3",
  "Business Consulting": "687a112eff8f487cbd3cf2dd",
  "Technical Support": "6879fa0bff8f487cbd3cf2ca",
  "Staffing Solutions": "687a09c0ff8f487cbd3cf2d8",
  Training: "687a2e24e7dd05494d3087d9",
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hideTopbar, setHideTopbar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | false>(false);
  const [showWhatWeDoDropdown, setShowWhatWeDoDropdown] = useState(false);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const shouldHide = window.scrollY > 50;
      setHideTopbar(shouldHide);
      window.dispatchEvent(
        new CustomEvent("topbar-visibility", { detail: shouldHide })
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close What We Do dropdown on route change and component mount
  useEffect(() => {
    setShowWhatWeDoDropdown(false);
  }, [pathname]);

  // Ensure dropdown is closed on component mount
  useEffect(() => {
    setShowWhatWeDoDropdown(false);
  }, []);

  // Close What We Do dropdown on scroll or click outside
  useEffect(() => {
    if (!showWhatWeDoDropdown) return;

    // Handler for scroll
    const handleScrollDropdown = () => {
      setShowWhatWeDoDropdown(false);
    };
    window.addEventListener("scroll", handleScrollDropdown);

    // Handler for click outside
    const handleClickOutside = (event: MouseEvent) => {
      // Find dropdown and nav item elements
      const dropdown = document.querySelector("[data-whatwedo-dropdown]");
      const navItem = document.querySelector("[data-whatwedo-navitem]");
      if (
        dropdown &&
        navItem &&
        !dropdown.contains(event.target as Node) &&
        !navItem.contains(event.target as Node)
      ) {
        setShowWhatWeDoDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScrollDropdown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showWhatWeDoDropdown]);

  // Helper handlers for What We Do? dropdown
  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setShowWhatWeDoDropdown(true);
  };
  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(
      () => setShowWhatWeDoDropdown(false),
      120
    );
  };

  function normalizeKey(label: string) {
    return label
      .toLowerCase()
      .replace(/and|&/g, "") // remove 'and' and '&'
      .replace(/[^a-z0-9]/g, ""); // remove all non-alphanumeric
  }

  return (
    <>
      <nav
        className={`fixed z-50 w-full bg-[#FFFFFF] navbar-custom shadow-md transition-all duration-500  ${
          hideTopbar ? "top-0" : "sm:top-[64px]"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo - larger and vertically centered */}
          <div className="flex items-center h-[60px]">
            <Link href="/">
            <Image
              src={assetsDataMap["ogs-logo"]}
              alt="Logo"
              width={180}
              height={60}
              style={{ objectFit: "contain" }}
            />
            </Link>
          </div>

          {/* Desktop Nav - evenly spaced, correct order, blue dropdown icon */}
          <ul className="ml-4 hidden md:flex gap-2  font-semibold text-[#2E3E95] text-lg items-center">
            {navLinks.map((link) => {
              const isDropdown = link.label === "What We Do?";
              const isActive = isDropdown ? false : pathname === link.href;
              const hasChildren = !!link.children;
              if (isDropdown && hasChildren) {
                return (
                  <li
                    key={link.href}
                    className="relative flex items-center hover:text-[#2E3E95] hover:font-bold group"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                    data-whatwedo-navitem={isDropdown ? true : undefined}
                  >
                    <Link
                      href={link.href}
                      className={`relative group flex items-center justify-center px-5 h-[44px] rounded-[30px] transition-all duration-300 font-semibold text-lg overflow-hidden
                        ${isActive ? "text-white" : "text-[#2E3E95]"}`}
                    >
                      <span
                        className={`z-10 ${isDropdown ? "font-semibold" : ""} ${
                          isDropdown && isActive
                            ? "text-black"
                            : isActive
                            ? "text-white"
                            : ""
                        }${!isActive ? " group-hover:text-white" : ""}`}
                      >
                        {link.label}
                      </span>
                      {isDropdown && (
                        <svg
                          className="ml-2 w-4 h-4 z-10 text-[#479bc9]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.085l3.71-3.855a.75.75 0 111.08 1.04l-4.24 4.4a.75.75 0 01-1.08 0l-4.24-4.4a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {/* Animated Gradient Background on Hover */}
                      <span
                        className={`absolute inset-0 rounded-[30px] transition duration-500
                          ${
                            isActive
                              ? "opacity-100 animated-gradient"
                              : "opacity-0 group-hover:opacity-100 animated-gradient"
                          }
                        `}
                      />
                    </Link>
                    {/* Dropdown for desktop */}
                    {showWhatWeDoDropdown && (
                      <div
                        className={`absolute left-1/2 top-full transform -translate-x-1/2 flex justify-center z-50 pointer-events-auto mt-6`}
                        style={{ maxWidth: "none" }}
                        data-whatwedo-dropdown
                      >
                        <div
                          className={`bg-[#fafbfc] shadow-2xl rounded-xl px-20 py-12  flex flex-row gap-20 min-w-[900px] max-w-6xl w-full transition-all duration-300 ease-in-out opacity-100 translate-y-0 pointer-events-auto`}
                          style={{ minHeight: "240px" }}
                        >
                          {/* Services Column: left (heading+desc), right (list) */}
                          <div className="flex flex-row flex-1 min-w-[340px] max-w-[420px] pr-12 pl-12 justify-center gap-10">
                            <div className="flex flex-col justify-center min-w-[230px] mt-[-80px] max-w-[250px]">
                              <div className="font-bold text-lg mb-2 text-black hover:text-[#2E3E95] hover:font-bold">
                                {link.children[0].heading}
                              </div>
                              <div className="text-xs font-normal text-black mb-0 max-w-xs hover:text-[#2E3E95] leading-relaxed text-left">
                                {link.children[0].description}
                              </div>
                            </div>
                            <ul className="flex flex-col gap-2 min-w-[150px] ml-[40px] justify-center">
                              {link.children[0].items.map((item) => {
                                const serviceId = servicesMap[item.label]; // Get the ID by label

                                return (
                                  <li
                                    key={item.label}
                                    className="text-[15px] font-normal text-black py-0.5 whitespace-nowrap select-none tracking-wide hover:text-[#2E3E95] hover:font-bold cursor-pointer transition-colors duration-150"
                                  >
                                    <Link
                                      href={`/whatwedo/services/${serviceId}`}
                                      onClick={() =>
                                        setShowWhatWeDoDropdown(false)
                                      }
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          {/* Divider */}
                          <div
                            className="w-[2px] bg-[#2E3E95] mx-10 rounded-full self-stretch"
                            style={{ minHeight: "180px" }}
                          />
                          {/* Industries Column: left (heading+desc), right (list) */}
                          <div className="flex flex-row flex-1 min-w-[340px] max-w-[420px] pr-12 pl-8 justify-center gap-10">
                            <div className="flex flex-col justify-center min-w-[230px] mt-[-80px] max-w-[250px]">
                              <div className="font-bold text-lg mb-2 text-black hover:text-[#2E3E95] hover:font-bold">
                                {link.children[1].heading}
                              </div>
                              <div className="text-xs font-normal text-black hover:text-[#2E3E95]  mb-0 max-w-xs leading-relaxed">
                                {link.children[1].description}
                              </div>
                            </div>
                            <ul className="flex flex-col gap-2 min-w-[150px] ml-[40px] justify-center pr-8">
                              {link.children[1].items.map((item) => {
                                const industryKey = item.label
                                  .toLowerCase()
                                  .replace(/\s*&\s*/g, "and")
                                  .replace(/\s+/g, "")
                                  .replace(/-/g, "")
                                  .replace(/é/g, "e");

                                return (
                                  <li
                                    key={item.label}
                                    className="text-[15px] font-normal text-black py-0.5 whitespace-nowrap select-none tracking-wide hover:text-[#2E3E95] hover:font-bold cursor-pointer transition-colors duration-150"
                                  >
                                    <Link
                                      href={`/whatwedo/industries/${industryKey}`}
                                      onClick={() =>
                                        setShowWhatWeDoDropdown(false)
                                      }
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              }
              if (link.label === "Portfolio") {
                return (
                  <li key={link.href} className="relative flex items-center">
                    <a
                      href="https://portfolio-omniebeeglobalsolutions.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group flex items-center justify-center px-5 h-[44px] rounded-[30px] transition-all duration-300 font-semibold text-lg overflow-hidden text-[#2E3E95] whitespace-nowrap w-auto flex-shrink-0"
                    >
                      <span className="z-10 group-hover:text-white">{link.label}</span>
                      <span
                        className="absolute inset-0 rounded-[30px] transition duration-500 opacity-0 group-hover:opacity-100 animated-gradient"
                      />
                    </a>
                  </li>
                );
              }
              return (
                <li
                  key={link.href}
                  className="relative flex items-center group"
                >
                  <Link
                    href={link.href}
                    className={`relative group flex items-center justify-center px-5 h-[44px] rounded-[30px] transition-all duration-300 font-semibold text-lg overflow-hidden
                        ${isActive ? "text-white" : "text-[#2E3E95]"}`}
                  >
                    <span
                      className={`z-10 ${isDropdown ? "font-bold" : ""} ${
                        isDropdown && isActive
                          ? "text-black"
                          : isActive
                          ? "text-white"
                          : ""
                      }${!isActive ? " group-hover:text-white" : ""}`}
                    >
                      {link.label}
                    </span>
                    {isDropdown && (
                      <svg
                        className="ml-2 w-4 h-4 z-10 text-[#479bc9]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.085l3.71-3.855a.75.75 0 111.08 1.04l-4.24 4.4a.75.75 0 01-1.08 0l-4.24-4.4a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {/* Animated Gradient Background on Hover */}
                    <span
                      className={`absolute inset-0 rounded-[30px] transition duration-500
                        ${
                          isActive
                            ? "opacity-100 animated-gradient"
                            : "opacity-0 group-hover:opacity-100 animated-gradient"
                        }
                      `}
                    />
                  </Link>
                  {/* Dropdown for desktop - 3 columns, divider, 100% width, all black text, no hover color */}
                  {hasChildren && isDropdown && (
                    <div
                      className={`absolute left-1/2 top-full transform -translate-x-1/2 mt-4 flex justify-center z-50 pointer-events-none`}
                      style={{ maxWidth: "none" }}
                    >
                      <div
                        className={`bg-[#fafbfc] shadow-2xl rounded-xl px-20 py-12  flex flex-row gap-20 min-w-[900px] max-w-6xl w-full transition-all duration-300 ease-in-out ${
                          showWhatWeDoDropdown
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 -translate-y-4 pointer-events-none"
                        }`}
                        onMouseEnter={handleDropdownEnter}
                        onMouseLeave={handleDropdownLeave}
                        style={{
                          minHeight: "240px",
                        }}
                      >
                        {/* Services Column: left (heading+desc), right (list) */}
                        <div className="flex flex-row flex-1 min-w-[340px] max-w-[420px] pr-12 pl-12 justify-center gap-10">
                          <div className="flex flex-col justify-center min-w-[230px] mt-[-80px] max-w-[250px]">
                            <div className="font-bold text-lg mb-2 text-black hover:text-[#2E3E95] hover:font-bold">
                              {link.children[0].heading}
                            </div>
                            <div className="text-xs font-normal text-black mb-0 max-w-xs hover:text-[#2E3E95] leading-relaxed text-justify">
                              {link.children[0].description}
                            </div>
                          </div>
                          <ul className="flex flex-col gap-2 min-w-[150px] ml-[40px] justify-center">
                            {link.children[0].items.map((item) => {
                              const serviceId = servicesMap[item.label]; // Get the ID by label

                              return (
                                <li
                                  key={item.label}
                                  className="text-[15px] font-normal text-black py-0.5 whitespace-nowrap select-none tracking-wide hover:text-[#2E3E95] hover:font-bold cursor-pointer transition-colors duration-150"
                                >
                                  <Link
                                    href={`/whatwedo/services/${serviceId}`}
                                    onClick={() =>
                                      setShowWhatWeDoDropdown(false)
                                    }
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        {/* Divider */}
                        <div
                          className="w-[2px] bg-[#2E3E95] mx-10 rounded-full self-stretch"
                          style={{ minHeight: "180px" }}
                        />
                        {/* Industries Column: left (heading+desc), right (list) */}
                        <div className="flex flex-row flex-1 min-w-[340px] max-w-[420px] pr-12 pl-8 justify-center gap-10">
                          <div className="flex flex-col justify-center min-w-[230px] mt-[-80px] max-w-[250px]">
                            <div className="font-bold text-lg mb-2 text-black hover:text-[#2E3E95] hover:font-bold">
                              {link.children[1].heading}
                            </div>
                            <div className="text-xs font-normal text-black hover:text-[#2E3E95] mb-0 max-w-xs leading-relaxed">
                              {link.children[1].description}
                            </div>
                          </div>
                          <ul className="flex flex-col gap-2 min-w-[150px] ml-[40px] justify-center pr-8">
                            {link.children[1].items.map((item) => {
                              const industryKey = item.label
                                .toLowerCase()
                                .replace(/\s*&\s*/g, "and")
                                .replace(/\s+/g, "")
                                .replace(/-/g, "")
                                .replace(/é/g, "e");

                              return (
                                <li
                                  key={item.label}
                                  className="text-[15px] font-normal text-black py-0.5 whitespace-nowrap select-none tracking-wide hover:text-[#2E3E95] hover:font-bold cursor-pointer transition-colors duration-150"
                                >
                                  <Link
                                    href={`/whatwedo/industries/${industryKey}`}
                                    onClick={() =>
                                      setShowWhatWeDoDropdown(false)
                                    }
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-white z-50 shadow-md transition-transform duration-[2000ms] ease-in-out md:hidden transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end px-6 pt-6">
          <button onClick={() => setIsOpen(false)} aria-label="Close Menu">
            <svg
              className="w-6 h-6 text-[#2E3E95]"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <ul className="flex flex-col items-center text-center gap-6 p-6 text-[#2E3E95] font-semibold">
          {navLinks.map((link) => {
            const isDropdown = link.label === "What We Do?";
            const isActive = isDropdown
              ? false
              : pathname === link.href && !(dropdownOpen === "What We Do?"); // Only highlight Home if dropdown is not open
            const hasChildren = !!link.children;
            return (
              <li key={link.href} className="relative">
                <div className="flex items-center justify-between">
                  {link.label === "Portfolio" ? (
                    <a
                      href="https://portfolio-omniebeeglobalsolutions.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className={`relative group px-4 py-3 rounded-[30px] min-w-[160px] flex items-center justify-center text-lg font-semibold overflow-hidden text-[#2E3E95]`}
                    >
                      <span className="z-10">{link.label}</span>
                      <span className="absolute inset-0 rounded-[30px] transition duration-500 opacity-0 group-hover:opacity-100 animated-gradient" />
                    </a>
                  ) : hasChildren && isDropdown ? (
                    <button
                      type="button"
                      className={`relative group px-4 py-3 rounded-[30px] min-w-[160px] flex items-center justify-center text-lg font-semibold overflow-hidden w-full`}
                      onClick={() =>
                        setDropdownOpen(
                          dropdownOpen === link.label ? false : link.label
                        )
                      }
                    >
                      <span
                        className={`z-10 ${
                          isActive ? "text-white" : "text-[#2E3E95]"
                        }`}
                      >
                        {link.label}
                      </span>
                      <svg
                        className={`ml-2 w-4 h-4 transition-transform duration-200 ${
                          dropdownOpen === link.label ? "rotate-180" : "rotate-0"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                      <span
                        className={`absolute inset-0 rounded-[30px] transition duration-500
                          ${
                            isActive
                              ? "opacity-100 animated-gradient"
                              : "opacity-0 group-hover:opacity-100 animated-gradient"
                          }
                        `}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => {
                        if (!hasChildren) setIsOpen(false);
                      }}
                      className={`relative group px-4 py-3 rounded-[30px] min-w-[160px] flex items-center justify-center text-lg font-semibold overflow-hidden`}
                    >
                      <span
                        className={`z-10 ${
                          isActive ? "text-white" : "text-[#2E3E95]"
                        }`}
                      >
                        {link.label}
                      </span>
                      <span
                        className={`absolute inset-0 rounded-[30px] transition duration-500
                          ${
                            isActive
                              ? "opacity-100 animated-gradient"
                              : "opacity-0 group-hover:opacity-100 animated-gradient"
                          }
                        `}
                      />
                    </Link>
                  )}
                </div>
                {/* Dropdown for mobile */}
                {hasChildren &&
                  dropdownOpen === link.label &&
                  (link.label === "What We Do?" ? (
                    <div
                      className="mt-2 ml-0 bg-[#fafbfc] shadow-2xl rounded-2xl py-6 px-4 flex flex-col md:flex-row gap-6 w-[90vw] max-w-[98vw] max-h-[60vh] overflow-y-auto relative z-40 items-center text-center md:items-start md:text-left"
                      style={{ paddingTop: "2rem" }}
                    >
                      {/* Services Column */}
                      <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left min-w-[230px] max-w-[250px] px-4">
                        <div className="font-bold text-lg mb-2 text-black hover:text-[#2E3E95]">
                          {link.children[0].heading}
                        </div>
                        <div className="text-xs font-normal text-black mb-2 max-w-xs leading-relaxed">
                          {link.children[0].description}
                        </div>
                        <ul className="flex flex-col gap-2 items-center md:items-start hover:text-[#2E3E95]">
                          {link.children[0].items.map((item) => {
                            const serviceId = servicesMap[item.label];
                            return (
                              <li
                                key={item.label}
                                className="text-[15px] font-normal text-black py-0.5 whitespace-nowrap select-none tracking-wide hover:text-[#2E3E95] hover:font-bold cursor-pointer transition-colors duration-150"
                              >
                                <Link
                                  href={`/whatwedo/services/${serviceId}`}
                                  onClick={() => {
                                    setDropdownOpen(false);
                                    setIsOpen(false);
                                    setShowWhatWeDoDropdown(false);
                                  }}
                                >
                                  {item.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* Vertical Divider (Only on Desktop) */}
                      <div
                        className="hidden md:block w-[1.5px] bg-[#2E3E95] mx-2 rounded-full self-stretch"
                        style={{ minHeight: "120px" }}
                      />

                      {/* Industries Column */}
                      <div className="flex flex-col items-center md:items-start text-center md:text-left min-w-[230px] max-w-[250px]">
                        <div className="font-bold text-lg mb-2 text-black hover:text-[#2E3E95]">
                          {link.children[1].heading}
                        </div>
                        <div className="text-xs font-normal text-black mb-4 leading-relaxed">
                          {link.children[1].description}
                        </div>
                        <ul className="flex flex-col gap-2 min-w-[150px] justify-center">
                          {link.children[1].items.map((item) => {
                            const industryKey = item.label
                              .toLowerCase()
                              .replace(/\s*&\s*/g, "and")
                              .replace(/\s+/g, "")
                              .replace(/-/g, "")
                              .replace(/é/g, "e");
                            return (
                              <li
                                key={item.label}
                                className="text-[15px] font-normal text-black py-0.5 whitespace-nowrap select-none tracking-wide hover:text-[#2E3E95] hover:font-bold cursor-pointer transition-colors duration-150"
                              >
                                <Link
                                  href={`/whatwedo/industries/${industryKey}`}
                                  onClick={() => {
                                    setDropdownOpen(false);
                                    setIsOpen(false);
                                  }}
                                >
                                  {item.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <ul className="mt-2 ml-4 bg-white shadow-lg rounded-xl py-2 flex flex-col gap-1">
                      {/* For other links, fallback to previous logic if needed */}
                    </ul>
                  ))}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Backdrop for mobile menu */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30  bg-opacity-30 md:hidden"
        />
      )}

      {/* Inline Global Styles for Floating Gradient */}
      <style jsx global>{`
        .animated-gradient {
          background-image: linear-gradient(
            270deg,
            #479bc9f2,
            #2e3e95bf,
            #479bc9f2
          );
          background-size: 600% 600%;
          animation: gradientMove 5s ease infinite;
        }

        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
}
