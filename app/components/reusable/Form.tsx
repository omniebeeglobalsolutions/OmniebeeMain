"use client";
import { useEffect, useState } from "react";

const Form = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    company: "",
    help: "",
    subscribe: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [nameError, setNameError] = useState("");


  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (name === "name") {
      let cleanValue = value;

      // Restrict to 25 characters
      if (cleanValue.length > 25) {
        cleanValue = cleanValue.slice(0, 25);
      }

      // Disallow multiple consecutive spaces
      if (/\s{2,}/.test(cleanValue)) {
        setNameError("Name cannot contain multiple spaces in a row.");
      } else {
        setNameError("");
      }

      setForm((prev) => ({ ...prev, name: cleanValue }));
      return;
    }

    if (name === "mobile") {
      const numericValue = value.replace(/\D/g, "").slice(0, 10);
      setForm((prev) => ({ ...prev, [name]: numericValue }));

      if (numericValue && !/^[6-9]/.test(numericValue)) {
        setMobileError("Mobile number must start with digits between 6 to 9.");
      } else {
        setMobileError("");
      }
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    // === Custom Email Validation Start ===
    const email = form.email.trim();

    if (!email) {
      setError("Please enter your email.");
      setLoading(false);
      return;
    }

    if (!/^[a-zA-Z][a-zA-Z0-9._]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setError("Enter a valid email address.");
      setLoading(false);
      return;
    }

    if (/[^a-zA-Z0-9@._]/.test(email)) {
      setError("Email should not contain special characters except @ . _");
      setLoading(false);
      return;
    }

    const allowedEndings = [
      ".com",
      ".in",
      ".org",
      ".co",
      ".io",
      ".info",
      ".email",
    ];

    if (
      !allowedEndings.some((ending) => email.toLowerCase().endsWith(ending))
    ) {
      setError("Enter valid email address.");
      setLoading(false);
      return;
    }
    // === Custom Email Validation End ===

    // === Mobile Validation ===
    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      setError(
        "Please enter a valid 10-digit mobile number starting with 6–9."
      );
      setLoading(false);
      return;
    }

    // === Company Domain Validation ===
    if (form.company.trim()) {
      const emailDomain = email.split("@")[1]?.toLowerCase();
      const companyName = form.company.trim().toLowerCase().replace(/\s+/g, "");
      const personalDomains = [
        "gmail.com",
        "yahoo.com",
        "outlook.com",
        "hotmail.com",
        "protonmail.com",
      ];

      if (personalDomains.includes(emailDomain)) {
        setError(
          "Please use your company email if you’ve entered a company name."
        );
        setLoading(false);
        return;
      }

      if (!emailDomain.includes(companyName)) {
        setError("The email domain should match your company name.");
        setLoading(false);
        return;
      }
    }

    // === Submit Form ===
    try {
      const res = await fetch(
        "https://omniebee-server.vercel.app/api/contact/info",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Failed to send message");

      setSuccess(true);
      setForm({
        name: "",
        email: "",
        mobile: "",
        company: "",
        help: "",
        subscribe: false,
      });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative w-full min-h-[500px] flex items-start"
      style={{ minHeight: "500px" }}
    >
      <img
        src="https://res.cloudinary.com/dqgixj7vr/image/upload/v1752735375/hjsmlbtpb2pperbdcd2c.jpg"
        alt="Office background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div
        className="absolute inset-0 z-10"
        style={{
          background: "linear-gradient(90deg, #2E3E95CC 10%, #D9D9D91A 80%)",
        }}
      />
      <div className="relative z-20 w-full max-w-3xl px-8 py-10 flex flex-col justify-center mt-10">
        <h2 className="text-[#FFFFFF] text-2xl md:text-3xl font-bold mb-6">
          Request More Information
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex flex-col">
              <input
                name="name"
                type="text"
                autoComplete="off"
                required
                placeholder="Name*"
                className={`rounded px-4 py-2 focus:outline-none border ${
                  nameError ? "border-red-500" : "border-[#EDEDED80]"
                } text-[#FFFFFF] bg-transparent`}
                value={form.name}
                onChange={handleChange}
              />
              {nameError && (
                <span className="text-red-500 text-sm mt-1">{nameError}</span>
              )}
            </div>

            <div className="flex-1 flex flex-col">
              <input
                name="email"
                type="email"
                required
                placeholder="Email*"
                className="rounded px-4 py-2 focus:outline-none border text-[#FFFFFF] border-[#EDEDED80] bg-transparent"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex flex-col">
              <input
                name="mobile"
                type="text"
                required
                placeholder="Mobile*"
                className={`rounded px-4 py-2 focus:outline-none text-white border ${
                  mobileError ? "border-red-500" : "border-[#EDEDED80]"
                } bg-transparent`}
                value={form.mobile}
                onChange={handleChange}
              />
              {mobileError && (
                <span className="text-red-500 text-sm mt-1">{mobileError}</span>
              )}
            </div>

            <div className="flex-1 flex flex-col">
              <input
                name="company"
                type="text"
                required
                placeholder="Company*"
                className="rounded px-4 py-2 text-[#FFFFFF] focus:outline-none border border-[#EDEDED80] bg-transparent"
                value={form.company}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <textarea
              name="help"
              rows={2}
              placeholder="How can I help you?"
              className="w-full rounded px-4 py-2 focus:outline-none border text-[#FFFFFF] border-[#EDEDED80] bg-transparent"
              value={form.help}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              name="subscribe"
              className="mt-3 border border-[#767676]"
              checked={form.subscribe}
              onChange={handleChange}
            />
            <label htmlFor="subscribe" className="text-[#FFFFFF] text-sm">
              Subscribe to our resources to receive strategy guides, industry
              insights, trends reports, and more in your inbox!
            </label>
          </div>

          {error && (
            <div className="text-red-400 text-sm font-medium">{error}</div>
          )}
          {success && (
            <div className="text-green-400 text-sm font-medium">
              Thank you! Your request has been submitted. We'll get back within
              24 hours.
            </div>
          )}

          <button
            type="submit"
            className="mt-2 px-8 py-2 bg-[#56B9F0] text-[#FFFFFF] rounded hover:bg-blue-500 transition w-fit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
