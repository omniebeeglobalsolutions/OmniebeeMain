"use client";
import { useState, useEffect } from "react";
import { assetsDataMap } from "@/app/utils/assetsDataMap";
import Link from "next/link";
import axios from "axios";

const IntroSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    yearsOfExperience: "",
    noticePeriod: "",
    primarySkills: "",
    designation: "",
    currentCTC: "",
    expectedCTC: "",
    linkedin: "",
  });
  const [formErrors, setFormErrors] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    yearsOfExperience: "",
    noticePeriod: "",
    primarySkills: "",
    designation: "",
    currentCTC: "",
    expectedCTC: "",
    linkedin: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [resumeError, setResumeError] = useState("");
  // No touchedFields/onBlur logic

  // Validation function for all fields
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "fullname":
        if (!value.trim()) return "Please enter your full name.";
        if (!/^[a-zA-Z ]{2,}$/.test(value.trim())) return "Name should contain only letters and spaces (min 2 characters).";
        if (/[^a-zA-Z ]/.test(value.trim())) return "Name should not contain special characters.";
        return "";
      case "email":
        if (!value.trim()) return "Please enter your email.";
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return "Enter a valid email address.";
        if (/[^a-zA-Z0-9@._-]/.test(value)) return "Email should not contain special characters except @ . _ -";
        return "";
      case "phoneNumber":
        if (!value.trim()) return "Please enter your phone number.";
        if (!/^[6-9]\d{9}$/.test(value)) return "Enter a valid 10-digit phone number.";
        return "";
      case "yearsOfExperience":
        if (!value.trim()) return "Please enter your years of experience.";
        if (isNaN(Number(value)) || Number(value) < 0) return "Enter a valid number.";
        return "";
      case "noticePeriod":
        if (!value.trim()) return "Please enter your notice period.";
        if (/[^a-zA-Z0-9 ]/.test(value.trim())) return "Notice period should not contain special characters.";
        return "";
      case "primarySkills":
        if (!value.trim()) return "Please enter your primary skills.";
        if (value.trim().length < 2) return "Primary skills should be at least 2 characters.";
        return "";
      case "designation":
        if (!value.trim()) return "Please enter the designation.";
        if (value.trim().length < 2) return "Designation should be at least 2 characters.";
        if (/[^a-zA-Z ]/.test(value.trim())) return "Designation should only contain letters and spaces.";
        return "";
      case "currentCTC":
        if (!value.trim()) return "Please enter your current Cmd.";
        if (isNaN(Number(value)) || Number(value) < 0) return "Enter a valid number.";
        return "";
      case "expectedCTC":
        if (!value.trim()) return "Please enter your expected CTC.";
        if (isNaN(Number(value)) || Number(value) < 0) return "Enter a valid number.";
        return "";
      case "linkedin":
        if (value.trim() && !/^https?:\/\/(www\.)?linkedin\.com\//.test(value.trim())) return "Enter a valid LinkedIn URL.";
        return "";
      default:
        return "";
    }
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (showSuccessModal) {
      timer = setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showSuccessModal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      setResumeError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Required field validation
    let hasError = false;
    const newErrors: typeof formErrors = { ...formErrors };
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key as keyof typeof formErrors] = `Please enter ${key
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()}.`;
        hasError = true;
      }
    });
    if (!resumeFile) {
      setResumeError("Please upload your resume.");
      hasError = true;
    } else {
      setResumeError("");
    }
    setFormErrors(newErrors);
    if (hasError) return;

    setLoading(true);

    try {
      const cloudinaryData = new FormData();
      cloudinaryData.append("file", resumeFile!);
      cloudinaryData.append("upload_preset", "omniebee_web");

      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dhkqyogas/upload",
        cloudinaryData
      );

      const resumeUrl = uploadRes.data.secure_url;

      const payload = {
        fullname: formData.fullname,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        yearsOfExperience: Number(formData.yearsOfExperience),
        noticePeriod: formData.noticePeriod,
        primarySkills: formData.primarySkills,
        designation: formData.designation,
        currentCTC: Number(formData.currentCTC),
        expectedCTC: Number(formData.expectedCTC),
        linkedin: formData.linkedin,
        resumeUrl,
      };

      await axios.post(
        "https://omniebee-server.vercel.app/api/quickapply",
        payload
      );

      setShowModal(false);
      setShowSuccessModal(true);
      setFormData({
        fullname: "",
        email: "",
        phoneNumber: "",
        yearsOfExperience: "",
        noticePeriod: "",
        primarySkills: "",
        designation: "",
        currentCTC: "",
        expectedCTC: "",
        linkedin: "",
      });
      setResumeFile(null);
      setResumeError("");
    } catch (err: any) {
      console.error("Submission error:", err.response?.data || err.message);
      alert(
        "Submission failed. Please ensure all fields are correctly filled."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Main Section */}
      <section className="py-12 px-4 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Left */}
        <div className="flex-1 w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-[#2E3E95]">
            Dream more than a Job.
            <br />
            Grow your <span className="text-[#479BC9]">CAREER</span> to the
            Fullest.
          </h2>
          <div className="flex items-center gap-4 mb-4 font-medium text-[#2E3E95]">
            <a href="#">Learn More</a>
            <span className="h-4 w-px bg-gray-300" />
            <a href="#">Earn More</a>
            <span className="h-4 w-px bg-gray-300" />
            <a href="#">Grow More</a>
          </div>
          <p className="mb-2 text-gray-700 max-w-xl">
            If you’re looking for a workplace that values learning, rewards
            curiosity, and empowers you to take ownership, you’ve found the
            right place. We foster a collaborative culture where challenges are
            opportunities, and every project is a chance to grow.
          </p>
          <p className="mb-6 text-gray-700 max-w-xl">
            - “Not just a job. A place to thrive.”
          </p>
          <div className="grid grid-cols-2 gap-3 max-w-xs">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 rounded-sm font-bold cursor-pointer text-sm button-secondary text-white transition-all duration-300 hover:bg-[#2e3e95]"
            >
              Quick Apply
            </button>
            <Link href="/careers/employee-benefits">
              <button className="px-4 py-2 rounded-sm font-bold text-sm button-secondary text-white cursor-pointer transition-all duration-300 hover:bg-[#2e3e95]">
                Employee Benefits
              </button>
            </Link>
            <button
              className="px-4 py-2 rounded-sm font-bold text-sm button-secondary text-white cursor-pointer transition-all duration-300 hover:bg-[#2e3e95]"
              onClick={() => setShowShareModal(true)}
            >
              Refer a Friend
            </button>
            <a href="#employee-review">
              <button className="px-4 py-2 rounded-sm font-bold text-sm button-secondary text-white">
                Employee Reviews
              </button>
            </a>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 w-full md:w-1/2 flex justify-center">
          <img
            src={assetsDataMap["Career-2ndSlide"]}
            alt="Job Illustration"
            className="w-full max-w-md h-auto object-contain"
          />
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 backdrop-blur-2xl bg-black bg-opacity-30 flex items-center justify-center px-4 sm:px-6">
          <div className="relative bg-white shadow-lg w-full max-w-4xl h-[90vh] rounded-lg overflow-y-auto p-5 mt-12">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600 text-2xl font-bold"
            >
              &times;
            </button>

            <h3 className="text-2xl font-semibold text-center mb-6 text-[#56B9F0]">
              Apply for a Role
            </h3>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[
                { label: "Full Name", name: "fullname", placeholder: "Enter your full name" },
                { label: "Email Address", name: "email", placeholder: "Enter your email address" },
                { label: "Phone Number", name: "phoneNumber", placeholder: "Enter your 10-digit phone number" },
                { label: "Years of Experience", name: "yearsOfExperience", placeholder: "e.g. 3" },
                { label: "Notice Period", name: "noticePeriod", placeholder: "e.g. 2 months" },
                { label: "Primary Skills", name: "primarySkills", placeholder: "e.g. React, Node.js" },
                { label: "Designation Applying For", name: "designation", placeholder: "e.g. Software Engineer" },
                { label: "Current CTC", name: "currentCTC", placeholder: "e.g. 500000" },
                { label: "Expected CTC", name: "expectedCTC", placeholder: "e.g. 700000" },
                { label: "Linkedin Profile Link", name: "linkedin", placeholder: "Paste your LinkedIn profile URL" },
              ].map(({ label, name, placeholder }, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-[#479BC9] mb-1">
                    {label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={
                      [
                        "currentCTC",
                        "expectedCTC",
                        "yearsOfExperience",
                      ].includes(name)
                        ? "number"
                        : "text"
                    }
                    name={name}
                    value={(formData as any)[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                  {formErrors[name as keyof typeof formErrors] && (
                    <p className="text-sm text-red-600 mt-1">
                      {formErrors[name as keyof typeof formErrors]}
                    </p>
                  )}
                </div>
              ))}

              {/* Resume Upload */}
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-[#479BC9] mb-1">
                  Upload Resume <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeChange}
                  className="file:bg-gray-300 mt-2 file:border-none file:px-4 file:py-2 file:text-sm file:font-medium text-black w-full cursor-pointer border border-gray-300 rounded"
                />
                {resumeError && (
                  <p className="text-sm text-red-600 mt-1">{resumeError}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="col-span-1 md:col-span-2 flex justify-start mt-4">
                <button
                  type="submit"
                  className="bg-[#479BC9] text-white px-6 py-2 rounded font-semibold hover:bg-[#2E3E95] transition disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showShareModal && (
        <div className="fixed inset-0 z-50 backdrop-blur-2xl bg-black bg-opacity-30 flex items-center justify-center px-4 sm:px-6">
          <div className="relative bg-white shadow-lg w-full max-w-4xl h-[40vh] sm:h-[30vh] rounded-lg overflow-y-auto p-5 mt-12">
            <h3 className="text-lg sm:text-2xl font-bold mb-6 text-[#2E3E95] text-center mb-5">
              Share with your Friends
            </h3>

            <div className="grid grid-cols-3 sm:flex sm:flex-wrap justify-center gap-y-6 text-[#2E3E95]">
              {/* Each item */}
              {[
                {
                  name: "Whatsapp",
                  url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
                    "Check out this career opportunity: http://localhost:3000/careers"
                  )}`,
                  icon: assetsDataMap["whatsapp-logo"],
                },
                {
                  name: "Facebook",
                  url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    "http://localhost:3000/careers"
                  )}`,
                  icon: assetsDataMap["facebook-logo"],
                },
                {
                  name: "LinkedIn",
                  url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    "http://localhost:3000/careers"
                  )}`,
                  icon: assetsDataMap["linkedin-logo"],
                },
                {
                  name: "Twitter",
                  url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    "http://localhost:3000/careers"
                  )}&text=${encodeURIComponent("Explore this role")}`,
                  icon: assetsDataMap["twitter-logo"],
                },
                {
                  name: "Gmail",
                  url: `mailto:?subject=Great Career Opportunity&body=Check this out: http://localhost:3000/careers`,
                  icon: assetsDataMap["gmail-logo"],
                },
                {
                  name: "Telegram",
                  url: `https://t.me/share/url?url=${encodeURIComponent(
                    "http://localhost:3000/careers"
                  )}&text=${encodeURIComponent(
                    "Check out this career opportunity!"
                  )}`,
                  icon: assetsDataMap["telegram-logo"],
                },
                {
                  name: "Instagram",
                  url: "https://www.instagram.com/omniebee_global_solutions/",
                  icon: assetsDataMap["instagram-logo"],
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center w-[80px] mx-auto"
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={item.name}
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-10 h-10"
                    />
                  </a>
                  <p className="text-xs text-black font-bold mt-2">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="mt-6 text-sm text-[#2E3E95] hover:underline flex justify-center items-center gap-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-invert backdrop-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center animate-modal-pop relative min-w-[400px]">
            <div className="flex items-center justify-center mb-4">
              <svg
                className="w-16 h-16 text-green-500 animate-checkmark-pop"
                viewBox="0 0 52 52"
              >
                <circle cx="26" cy="26" r="25" fill="#e6f9f0" />
                <path
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 27l8 8 12-16"
                >
                  <animate
                    attributeName="stroke-dasharray"
                    from="0,40"
                    to="40,0"
                    dur="0.5s"
                    fill="freeze"
                  />
                </path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#2E3E95] mb-2">
              Thank You!
            </h3>
            <p className="text-gray-700 text-center mb-4">
              Your application has been submitted successfully.
              <br />
              We’ll be in touch shortly.
            </p>
          </div>

          <style jsx>{`
            .animate-modal-pop {
              animation: modal-pop 0.4s cubic-bezier(0.22, 1, 0.36, 1);
            }
            @keyframes modal-pop {
              0% {
                opacity: 0;
                transform: scale(0.8);
              }
              100% {
                opacity: 1;
                transform: scale(1);
              }
            }
            .animate-checkmark-pop {
              stroke-dasharray: 40;
              stroke-dashoffset: 40;
              animation: checkmark-pop 0.6s 0.1s cubic-bezier(0.22, 1, 0.36, 1)
                forwards;
            }
            @keyframes checkmark-pop {
              to {
                stroke-dashoffset: 0;
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default IntroSection;
