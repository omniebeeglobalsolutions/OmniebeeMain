"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { assetsDataMap } from "../utils/assetsDataMap";

export default function ContactFormpage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    zip: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    zip: "",
    service: "",
    message: "",
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (success) {
      timer = setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [success]);

  // Validation function for all fields
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Please enter your name.";
        if (!/^[a-zA-Z ]{2,}$/.test(value.trim()))
          return "Name should contain only letters and spaces (min 2 characters).";
        if (/[^a-zA-Z ]/.test(value.trim()))
          return "Name should not contain special characters.";
        return "";
      case "email":
        if (!value.trim()) return "Please enter your email.";
        if (!/^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
          return "Enter a valid email address.";
        if (/[^a-zA-Z0-9@._]/.test(value))
          return "Email should not contain special characters except @ . _ ";
        return "";
      case "phone":
        if (!value.trim()) return "Please enter your phone number.";
        if (!/^[6-9]\d{9}$/.test(value))
          return "Enter a valid 10-digit phone number.";
        return "";
      case "zip":
        if (!value.trim()) return "Please enter your zip code.";
        if (!/^\d{6}$/.test(value.trim()))
          return "Enter a valid 6-digit Indian zip code.";
        return "";
      case "service":
        if (!value.trim()) return "Please select a service.";
        return "";
      case "message":
        if (!value.trim()) return "Please enter your message.";
        if (value.trim().length < 10)
          return "Message should be at least 10 characters.";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Handle phone number input restriction (max 10 digits)
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, ""); // Remove non-digits
      if (numericValue.length <= 10) {
        setForm({ ...form, [name]: numericValue });
        const error = validateField(name, numericValue);
        setFormErrors((prev) => ({ ...prev, [name]: error }));
      }
      return;
    }

    // Handle zip code input restriction (max 6 digits)
    if (name === "zip") {
      const numericValue = value.replace(/\D/g, ""); // Remove non-digits
      if (numericValue.length <= 6) {
        setForm({ ...form, [name]: numericValue });
        const error = validateField(name, numericValue);
        setFormErrors((prev) => ({ ...prev, [name]: error }));
      }
      return;
    }

    // Handle other fields normally
    setForm({ ...form, [name]: value });
    const error = validateField(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Custom validationn
    let hasError = false;
    const newErrors = { ...formErrors };
    Object.entries(form).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key as keyof typeof formErrors] = error;
        hasError = true;
      } else {
        newErrors[key as keyof typeof formErrors] = "";
      }
    });
    setFormErrors(newErrors);
    if (hasError) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        "https://omniebee-server.vercel.app/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            mobile: form.phone,
            zipcode: form.zip,
            message: form.message,
            service: form.service,
          }),
        }
      );
      if (!res.ok) throw new Error("Failed to send message");
      setSuccess(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        zip: "",
        service: "",
        message: "",
      });
    } catch (err: any) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setSuccess(false);

  return (
    <div className="bg-[#F5F5F5] flex-col justify-start pt-0 mt-0">
      <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 bg- p-8 rounded-xl shadow-md bg-[#F5F5F5]">
          {/* Form Section */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Get In Touch With Us</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    onChange={handleChange}
                    value={form.name}
                    className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 bg-white"
                  />
                  {formErrors.name && (
                    <p className="text-sm text-red-600 mt-1">{formErrors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    onChange={handleChange}
                    value={form.email}
                    className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 bg-white"
                  />
                  {formErrors.email && (
                    <p className="text-sm text-red-600 mt-1">{formErrors.email}</p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your 10-digit mobile number"
                    onChange={handleChange}
                    value={form.phone}
                    maxLength={10}
                    className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 bg-white"
                  />
                  {formErrors.phone && (
                    <p className="text-sm text-red-600 mt-1">{formErrors.phone}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    name="zip"
                    placeholder="Enter your 6-digit Indian zip code"
                    onChange={handleChange}
                    value={form.zip}
                    maxLength={6}
                    className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 bg-white"
                  />
                  {formErrors.zip && (
                    <p className="text-sm text-red-600 mt-1">{formErrors.zip}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <select
                    name="service"
                    onChange={handleChange}
                    value={form.service}
                    className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 bg-white"
                    aria-placeholder="Select a service"
                  >
                    <option value="">Select a service</option>
                    <option value="Software Devlopment">Software Devlopment</option>
                    <option value="Web Development">Technnical Support</option>
                    <option value="It Consulting">It Consulting</option>
                    <option value="Staffing Solutions"> Staffing Solutions</option>
                    <option value="Business Consulting"> Business Consulting</option>
                    <option value="Training Services"> Training Services</option>
                    <option value="Other..."> Other...</option>
                  </select>
                  {formErrors.service && (
                    <p className="text-sm text-red-600 mt-1">{formErrors.service}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <textarea
                    name="message"
                    placeholder="Type your message here"
                    rows={4}
                    onChange={handleChange}
                    value={form.message}
                    className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 bg-white"
                  />
                  {formErrors.message && (
                    <p className="text-sm text-red-600 mt-1">{formErrors.message}</p>
                  )}
                </div>
              </div>
              {error && (
                <div className="text-red-500 text-sm font-medium">{error}</div>
              )}
              <button
                type="submit"
                className="button-primary text-white px-6 py-2 rounded hover:bg-[#2e3e95] transition-all font-semibold shadow-md disabled:opacity-60"
                disabled={loading}
              >
                {loading ? "Sending..." : "Submit Message"}
              </button>
            </form>
          </div>

          {/* Contact Info Section */}
          <div className="bg-[#2E3E95] text-white w-full max-w-md md:max-w-md p-6 sm:p-4 md:p-6 rounded-lg space-y-5 mx-auto">
            <h3 className="text-xl font-semibold">Contact Info</h3>
            <div className="space-y-4 text-sm">
              {/* Phone */}
              <div className="flex items-center gap-3 min-w-0" style={{marginBottom: "50px"}}>
                <div className="pt-1">
                  <Image
                    src={assetsDataMap["phone-logo"]}
                    alt="Phone"
                    width={30}
                    height={30}
                    className="w-10 h-10 object-cover"
                    priority
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-semibold text-xs">Call Us</p>
                  <a
                    href="tel:+919505637481"
                    className="text-white font-bold hover:text-[#56b9f0] break-all"
                  >
                    +91 9505637481
                  </a>
                </div>
              </div>
              {/* Email */}
              <div className="flex items-center gap-3 min-w-0" style={{marginBottom: "50px", wordBreak: "break-all"}}>
                <div className="pt-1">
                  <Image
                    src={assetsDataMap["mail-logo"]}
                    alt="Email"
                    width={30}
                    height={30}
                    className="w-10 h-10 object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-white font-semibold text-xs">Email Us</p>
                  <a
                    href="mailto:support@omniebeeglobalsolutions.com"
                    className="text-white font-bold break-all hover:text-[#56b9f0] text-sm"
                    style={{ wordBreak: "break-all" }}
                  >
                    support@omniebeeglobalsolutions.com
                  </a>
                </div>
              </div>
              {/* Location */}
              <div className="flex items-center gap-3 min-w-0 mb-12">
                <div>
                  <Image
                    src={assetsDataMap["location-logo"]}
                    alt="Location"
                    width={30}
                    height={30}
                    className="w-10 h-10 object-contain"
                    priority
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-white font-semibold text-xs">Our Location</p>
                  <a className="font-bold hover:text-[#56b9f0] cursor-pointer">
                    8-3-231/A 77 & 78, Sri Krishna Nagar, <br />
                    Yousufguda, Hyderabad, 500045
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Success Modal */}
        {success && (
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
                Your message has been sent successfully.
                <br />
                We will get back to you soon.
              </p>
              {/* Removed Close button, now closes automatically */}
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
                animation: checkmark-pop 0.6s 0.1s
                  cubic-bezier(0.22, 1, 0.36, 1) forwards;
              }
              @keyframes checkmark-pop {
                to {
                  stroke-dashoffset: 0;
                }
              }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );
}
