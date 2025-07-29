"use client";
import { assetsDataMap } from "@/app/utils/assetsDataMap";
import CareerById from "../../../components/CareerOpportunities/CareerById";
import { use, useEffect, useState, useRef } from "react";

// Job type definition (reuse from CareerById)
type Job = {
  _id: string;
  title: string;
  postedDate: string;
  workExperience: number;
  industry: string;
  role: string;
  whatYouWillDo?: string;
  whatYouWillBring?: string;
  requirements?: string;
  location: string;
  jobType: string;
  __v: number;
};

const API_URL = "https://omniebee-server.vercel.app/api/jobs";

const SKILLS = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Angular",
  "Vue.js",
  "Next.js",
  "Redux",
  "SASS",
  "Bootstrap",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "Python",
  "Django",
  "Flask",
  "Java",
  "Spring",
  "C#",
  ".NET",
  "PHP",
  "Laravel",
  "Symfony",
  "Ruby",
  "Rails",
  "Go",
  "Rust",
  "C++",
  "C",
  "GraphQL",
  "MongoDB",
  "MySQL",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "GCP",
];

export default function JobApplyPage({
  params,
}: {
  params: { jobId: string };
}) {
  const { jobId } = params;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    street: "",
    zip: "",
    city: "",
    state: "",
    skills: [] as string[],
    skillInput: "",
    experience: "",
    qualification: "-None-",
    relevantExperience: "",
    employer: "",
    notice: "",
    currentSalary: "",
    expectedSalary: "",
    resumePublicId: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [skillSuggestions, setSkillSuggestions] = useState<string[]>([]);
  const [skillDropdown, setSkillDropdown] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch(API_URL);
        const data: Job[] = await res.json();
        const found = data.find((j) => j._id === jobId) || null;
        setJob(found);
      } catch (e) {
        setJob(null);
      }
      setLoading(false);
    }
    fetchJob();
  }, [jobId]);

  // Skill search logic
  useEffect(() => {
    if (form.skillInput.trim() === "") {
      setSkillSuggestions([]);
      return;
    }
    const filtered = SKILLS.filter(
      (s) =>
        s.toLowerCase().includes(form.skillInput.toLowerCase()) &&
        !form.skills.includes(s)
    );
    setSkillSuggestions(filtered);
  }, [form.skillInput, form.skills]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Real-time validation
    let errorMessage = "";

    switch (name) {
      case "firstName":
        if (value.trim() && !/^[a-zA-Z\s]{2,50}$/.test(value.trim())) {
          errorMessage = "First Name should be 2-50 characters, letters only";
        }
        break;
      case "lastName":
        if (value.trim() && !/^[a-zA-Z\s]{2,50}$/.test(value.trim())) {
          errorMessage = "Last Name should be 2-50 characters, letters only";
        }
        break;
      case "email":
        if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          errorMessage = "Please enter a valid email address";
        }
        break;
      case "mobile":
        if (value.trim() && !/^[6-9]\d{9}$/.test(value.trim())) {
          errorMessage = "Please enter a valid 10-digit Indian mobile number";
        }
        break;
      case "street":
        if (value.trim() && value.trim().length < 5) {
          errorMessage = "Street address should be at least 5 characters";
        }
        break;
      case "zip":
        if (value.trim() && !/^[1-9][0-9]{5}$/.test(value.trim())) {
          errorMessage = "Please enter a valid 6-digit Indian postal code";
        }
        break;
      case "city":
        if (value.trim() && !/^[a-zA-Z\s]{2,50}$/.test(value.trim())) {
          errorMessage = "City should be 2-50 characters, letters only";
        }
        break;
      case "state":
        if (value.trim() && !/^[a-zA-Z\s]{2,50}$/.test(value.trim())) {
          errorMessage = "State should be 2-50 characters, letters only";
        }
        break;
      case "experience":
        if (
          value.trim() &&
          (!/^[0-9]+(\.[0-9]+)?$/.test(value.trim()) ||
            parseFloat(value) < 0 ||
            parseFloat(value) > 50)
        ) {
          errorMessage = "Please enter a valid experience between 0-50 years";
        }
        break;
      case "relevantExperience":
        if (
          value.trim() &&
          (!/^[0-9]+(\.[0-9]+)?$/.test(value.trim()) ||
            parseFloat(value) < 0 ||
            parseFloat(value) > 50)
        ) {
          errorMessage =
            "Please enter a valid relevant experience between 0-50 years";
        }
        break;
      case "employer":
        if (value.trim() && value.trim().length < 2) {
          errorMessage = "Employer name should be at least 2 characters";
        }
        break;
      case "notice":
        if (
          value.trim() &&
          !/^[0-9]+\s*(days?|months?|weeks?)$/i.test(value.trim())
        ) {
          errorMessage =
            "Please enter notice period in format: '30 days' or '2 months'";
        }
        break;
      case "currentSalary":
        if (value.trim() && !/^[0-9,]+(\.[0-9]{1,2})?$/.test(value.trim())) {
          errorMessage = "Please enter a valid salary amount (numbers only)";
        }
        break;
      case "expectedSalary":
        if (value.trim() && !/^[0-9,]+(\.[0-9]{1,2})?$/.test(value.trim())) {
          errorMessage = "Please enter a valid salary amount (numbers only)";
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleSkillInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, skillInput: e.target.value }));
    setSkillDropdown(true);

    // Clear skills error when user starts typing
    if (form.skills.length === 0) {
      setErrors((prev) => ({ ...prev, skills: "" }));
    }
  };

  const handleSkillSelect = (skill: string) => {
    setForm((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
      skillInput: "",
    }));
    setSkillDropdown(false);

    // Clear skills error when skill is added
    setErrors((prev) => ({ ...prev, skills: "" }));
  };

  const handleSkillRemove = (skill: string) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));

    // Show skills error if no skills remain
    if (form.skills.length <= 1) {
      setErrors((prev) => ({
        ...prev,
        skills: "At least one skill is required",
      }));
    }
  };

  const CLOUDINARY_UPLOAD_PRESET = "omniebee_web";
  const CLOUDINARY_CLOUD_NAME = "dhkqyogas";
  const API_ENDPOINT = "https://omniebee-server.vercel.app/api/applications";

  const handleResumeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File type validation
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/rtf",
      "application/vnd.oasis.opendocument.text",
    ];

    if (!allowed.includes(file.type)) {
      setUploadError("Only .doc, .docx, .pdf, .odt, .rtf files are allowed");
      return;
    }

    // File size validation (10MB = 10 * 1024 * 1024 bytes)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      setUploadError("File size must be less than 10MB");
      return;
    }

    setUploadError("");
    setUploading(true);
    setResumeFile(file);

    // Upload to Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.secure_url && data.public_id) {
        setResumeUrl(data.secure_url);
        setForm((prev) => ({ ...prev, resumePublicId: data.public_id }));
      } else {
        setUploadError("Failed to upload resume");
      }
    } catch (err) {
      setUploadError("Failed to upload resume");
    }
    setUploading(false);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    // First Name validation
    if (!form.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    } else if (!/^[a-zA-Z\s]{2,50}$/.test(form.firstName.trim())) {
      newErrors.firstName =
        "First Name should be 2-50 characters, letters only";
    }

    // Last Name validation
    if (!form.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    } else if (!/^[a-zA-Z\s]{2,50}$/.test(form.lastName.trim())) {
      newErrors.lastName = "Last Name should be 2-50 characters, letters only";
    }

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    // Mobile validation (Indian format)
    if (!form.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) {
      newErrors.mobile = "Please enter a valid 10-digit Indian mobile number";
    }

    // Street validation
    if (!form.street.trim()) {
      newErrors.street = "Street address is required";
    } else if (form.street.trim().length < 5) {
      newErrors.street = "Street address should be at least 5 characters";
    }

    // Zip/Postal Code validation (Indian format)
    if (!form.zip.trim()) {
      newErrors.zip = "Zip/Postal Code is required";
    } else if (!/^[1-9][0-9]{5}$/.test(form.zip.trim())) {
      newErrors.zip = "Please enter a valid 6-digit Indian postal code";
    }

    // City validation
    if (!form.city.trim()) {
      newErrors.city = "City is required";
    } else if (!/^[a-zA-Z\s]{2,50}$/.test(form.city.trim())) {
      newErrors.city = "City should be 2-50 characters, letters only";
    }

    // State validation
    if (!form.state.trim()) {
      newErrors.state = "State/Province is required";
    } else if (!/^[a-zA-Z\s]{2,50}$/.test(form.state.trim())) {
      newErrors.state = "State should be 2-50 characters, letters only";
    }

    // Skills validation
    if (form.skills.length === 0) {
      newErrors.skills = "At least one skill is required";
    }

    // Experience validation
    if (!form.experience.trim()) {
      newErrors.experience = "Experience is required";
    } else if (
      !/^[0-9]+(\.[0-9]+)?$/.test(form.experience.trim()) ||
      parseFloat(form.experience) < 0 ||
      parseFloat(form.experience) > 50
    ) {
      newErrors.experience =
        "Please enter a valid experience between 0-50 years";
    }

    // Qualification validation
    if (!form.qualification || form.qualification === "-None-") {
      newErrors.qualification = "Qualification is required";
    }

    // Relevant Experience validation
    if (!form.relevantExperience.trim()) {
      newErrors.relevantExperience = "Relevant Experience is required";
    } else if (
      !/^[0-9]+(\.[0-9]+)?$/.test(form.relevantExperience.trim()) ||
      parseFloat(form.relevantExperience) < 0 ||
      parseFloat(form.relevantExperience) > 50
    ) {
      newErrors.relevantExperience =
        "Please enter a valid relevant experience between 0-50 years";
    }

    // Employer validation
    if (!form.employer || form.employer === "") {
      newErrors.employer = "Current Employer is required";
    }

    // Notice Period validation
    if (!form.notice.trim()) {
      newErrors.notice = "Notice Period is required";
    } else if (!/^[0-9]+\s*(days?|months?|weeks?)$/i.test(form.notice.trim())) {
      newErrors.notice =
        "Please enter notice period in format: '30 days' or '2 months'";
    }

    // Current Salary validation
    if (!form.currentSalary.trim()) {
      newErrors.currentSalary = "Current Salary is required";
    } else if (!/^[0-9,]+(\.[0-9]{1,2})?$/.test(form.currentSalary.trim())) {
      newErrors.currentSalary =
        "Please enter a valid salary amount (numbers only)";
    }

    // Expected Salary validation
    if (!form.expectedSalary.trim()) {
      newErrors.expectedSalary = "Expected Salary is required";
    } else if (!/^[0-9,]+(\.[0-9]{1,2})?$/.test(form.expectedSalary.trim())) {
      newErrors.expectedSalary =
        "Please enter a valid salary amount (numbers only)";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      if (!resumeUrl) {
        setUploadError("Please upload your resume");
        return;
      }
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        mobile: form.mobile,
        street: form.street,
        zipcode: form.zip,
        city: form.city,
        state: form.state,
        skillset: form.skills,
        yearsOfExperience: form.experience,
        highestQualification: form.qualification,
        relevantYearsOfExperience: Number(form.relevantExperience),
        currentEmployee: form.employer === "yes",
        noticePeriod: form.notice,
        currentCTC: Number(form.currentSalary),
        expectedCTC: Number(form.expectedSalary),
        resumeUrl: resumeUrl,
        resumePublicId: form.resumePublicId,
        jobId: job?._id,
        jobTitle: job?.title,
      };
      try {
        const res = await fetch(API_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setShowSuccessModal(true);
          setForm({
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            street: "",
            zip: "",
            city: "",
            state: "",
            skills: [],
            skillInput: "",
            experience: "",
            qualification: "-None-",
            relevantExperience: "",
            employer: "",
            notice: "",
            currentSalary: "",
            expectedSalary: "",
            resumePublicId: "",
          });
          setResumeFile(null);
          setResumeUrl("");
        } else {
          alert("Failed to submit application. Please try again.");
        }
      } catch (err) {
        alert("An error occurred. Please try again later.");
      }
    }
  };

  if (loading)
    return <div className="text-center py-20 text-xl">Loading...</div>;
  if (!job)
    return <div className="text-center py-20 text-xl">Job not found</div>;

  return (
    <div className="w-full min-h-screen bg-[#f7f7f7] flex flex-col items-center py-8">
      {/* Banner/Header Section (copied from CareerById, buttons hidden) */}
      <div className="w-full max-w-5xl rounded-lg overflow-hidden relative mb-8">
        <div
          className="h-80 w-full bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${assetsDataMap["Career-JobDescription-Banner"]})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 flex flex-col justify-center items-center text-white p-8">
            <div className="text-[#FFFFFF] font-semibold mb-2">
              Omniebee Global Solutions | {job?.jobType || "Full time"}
            </div>
            <h1 className="text-4xl text-[#FFFFFF] font-semibold mb-2 text-center">
              {job?.title || "Senior Software Developer - I"}
            </h1>
            <div className="text-sm text-[#FFFFFF] font-semibold mb-4 text-center">
              {job?.location || "Hyderabad, India"} | Posted on{" "}
              {job?.postedDate
                ? new Date(job.postedDate).toLocaleDateString()
                : "N/A"}
            </div>
          </div>
        </div>
      </div>
      {/* Job listing breadcrumbs */}
      {/* <div className="w-full max-w-5xl mx-auto px-4">
        <div className="text-sm text-[#FF6600] mb-2 flex justify-start">
          Job listing <span className="mx-1">•</span> Job details
          <span className="mx-1">•</span>
          <span className="text-[#479BC9]">First Name</span>
        </div>
      </div> */}
      {/* Application Form UI only, no job description */}
      <div className="w-full max-w-5xl bg-white rounded-lg shadow p-8 mt-8">
        {/* Complete Your Application */}
        <div className="text-[#479BC9] font-semibold mb-2">
          Complete Your Application
        </div>
        <div className="mb-4 text-[#646D8C]">Upload your resume/cv.</div>
        {/* Resume upload box */}
        <div className="border-2 border-dashed border-[#C4C4C4] rounded-lg p-6 mb-8 flex flex-col items-center bg-[#FAFAFA]">
          <span className="text-[#FF6600] font-semibold">
            Upload your resume
          </span>{" "}
          <span className="mx-1 text-gray-500">or</span>{" "}
          <span className="text-gray-500">drag and drop it here</span>
          <div className="text-xs text-gray-400 mt-2">
            Only .doc, .docx, .pdf, .odt, .rtf (Max 10MB){" "}
            <span className="text-gray-400">(optional)</span>
          </div>
          <input
            type="file"
            accept=".doc,.docx,.pdf,.odt,.rtf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,application/rtf,application/vnd.oasis.opendocument.text"
            className="hidden"
            ref={fileInputRef}
            onChange={handleResumeChange}
          />
          <button
            type="button"
            className="mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading
              ? "Uploading..."
              : resumeFile
              ? "Change File"
              : "Choose File"}
          </button>
          {resumeFile && resumeUrl && !uploading && (
            <div className="mt-2 text-green-600 text-sm">
              Uploaded: {resumeFile.name}
            </div>
          )}
          {uploadError && (
            <div className="mt-2 text-red-500 text-sm">{uploadError}</div>
          )}
        </div>
        {/* Form sections */}
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          {/* Basic Info */}
          <div>
            <label className="block text-sm font-medium mb-1 text-[#479BC9]">
              First Name <span className="text-[#FF6600]">*</span>
            </label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              type="text"
              className="w-full border rounded px-3 py-2"
              required
            />
            {errors.firstName && (
              <div className="text-xs text-red-500 mt-1">
                {errors.firstName}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-[#479BC9]">
              Last Name <span className="text-[#FF6600]">*</span>
            </label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              type="text"
              className="w-full border rounded px-3 py-2"
              required
            />
            {errors.lastName && (
              <div className="text-xs text-red-500 mt-1">{errors.lastName}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-[#479BC9]">
              Email <span className="text-[#FF6600]">*</span>
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              className="w-full border rounded px-3 py-2"
              required
            />
            {errors.email && (
              <div className="text-xs text-red-500 mt-1">{errors.email}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-[#479BC9]">
              Mobile <span className="text-[#FF6600]">*</span>
            </label>
            <div className="flex">
              <select
                className="border rounded-l px-2 py-2 bg-gray-100 text-sm"
                disabled
              >
                <option value="+91">🇮🇳 +91</option>
              </select>
              <input
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                type="tel"
                className="w-full border-t border-b border-r rounded-r px-3 py-2"
                required
              />
            </div>
            {errors.mobile && (
              <div className="text-xs text-red-500 mt-1">{errors.mobile}</div>
            )}
          </div>
          {/* Address Information */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-[#479BC9]">
                Address Information
              </span>
              <button
                type="button"
                className="text-[#FF6600] text-sm font-semibold"
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    street: "",
                    zip: "",
                    city: "",
                    state: "",
                  }))
                }
              >
                Clear
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-[#479BC9]">
                  Street <span className="text-[#FF6600]">*</span>
                </label>
                <input
                  name="street"
                  value={form.street}
                  onChange={handleChange}
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  required
                />
                {errors.street && (
                  <div className="text-xs text-red-500 mt-1">
                    {errors.street}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#479BC9]">
                  Zip/Postal Code <span className="text-[#FF6600]">*</span>
                </label>
                <input
                  name="zip"
                  value={form.zip}
                  onChange={(e) => {
                    // Only allow up to 6 digits
                    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                    handleChange({ target: { name: "zip", value: val } });
                  }}
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  required
                />
                {errors.zip && (
                  <div className="text-xs text-red-500 mt-1">{errors.zip}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#479BC9]">
                  City <span className="text-[#FF6600]">*</span>
                </label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  required
                />
                {errors.city && (
                  <div className="text-xs text-red-500 mt-1">{errors.city}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#479BC9]">
                  State/Province <span className="text-[#FF6600]">*</span>
                </label>
                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  required
                />
                {errors.state && (
                  <div className="text-xs text-red-500 mt-1">
                    {errors.state}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Professional Details */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-[#479BC9]">
                Professional Details
              </span>
              <button
                type="button"
                className="text-[#FF6600] text-sm font-semibold"
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    skills: [],
                    skillInput: "",
                    experience: "",
                    qualification: "-None-",
                    relevantExperience: "",
                    employer: "",
                    notice: "",
                    currentSalary: "",
                    expectedSalary: "",
                  }))
                }
              >
                Clear
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    className="ml-1 text-red-500"
                    onClick={() => handleSkillRemove(skill)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium mb-1 text-[#479BC9]">
                  Skill Set <span className="text-[#FF6600]">*</span>
                </label>
                <input
                  name="skillInput"
                  value={form.skillInput}
                  onChange={handleSkillInput}
                  onFocus={() => setSkillDropdown(true)}
                  onBlur={() => setTimeout(() => setSkillDropdown(false), 150)}
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  placeholder="Search and add skills"
                  autoComplete="off"
                />
                {skillDropdown && skillSuggestions.length > 0 && (
                  <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow max-h-40 overflow-y-auto">
                    {skillSuggestions.map((s) => (
                      <li
                        key={s}
                        className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                        onMouseDown={() => handleSkillSelect(s)}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
                {errors.skills && (
                  <div className="text-xs text-red-500 mt-1">
                    {errors.skills}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#479BC9]">
                  Experience in Years <span className="text-[#FF6600]">*</span>
                </label>
                <input
                  name="experience"
                  value={form.experience}
                  onChange={(e) => {
                    // Prevent negative values
                    const val = e.target.value;
                    if (
                      val === "" ||
                      (/^\d*\.?\d*$/.test(val) && parseFloat(val) >= 0)
                    ) {
                      handleChange(e);
                    }
                  }}
                  type="number"
                  min="0"
                  className="w-full border rounded px-3 py-2"
                  required
                />
                {errors.experience && (
                  <div className="text-xs text-red-500 mt-1">
                    {errors.experience}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#479BC9]">
                  Highest Qualification Held{" "}
                  <span className="text-[#FF6600]">*</span>
                </label>
                <select
                  name="qualification"
                  value={form.qualification}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option>-None-</option>
                  <option>Bachelor's</option>
                  <option>Master's</option>
                  <option>PhD</option>
                  <option>Other</option>
                </select>
                {errors.qualification && (
                  <div className="text-xs text-red-500 mt-1">
                    {errors.qualification}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#479BC9]">
                  Relevant Experience <span className="text-[#FF6600]">*</span>
                </label>
                <input
                  name="relevantExperience"
                  value={form.relevantExperience}
                  onChange={(e) => {
                    // Prevent negative values
                    const val = e.target.value;
                    if (
                      val === "" ||
                      (/^\d*\.?\d*$/.test(val) && parseFloat(val) >= 0)
                    ) {
                      handleChange(e);
                    }
                  }}
                  type="number"
                  min="0"
                  className="w-full border rounded px-3 py-2"
                  required
                />
                {errors.relevantExperience && (
                  <div className="text-xs text-red-500 mt-1">
                    {errors.relevantExperience}
                  </div>
                )}
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1 text-[#479BC9]">
                  Current Employer <span className="text-[#FF6600]">*</span>
                </label>
                <select
                  name="employer"
                  value={form.employer}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required
                >
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.employer && (
                  <div className="text-xs text-red-500 mt-1">
                    {errors.employer}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#479BC9]">
                  Notice Period <span className="text-[#FF6600]">*</span>
                </label>
                <input
                  name="notice"
                  value={form.notice}
                  onChange={handleChange}
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  required
                />
                {errors.notice && (
                  <div className="text-xs text-red-500 mt-1">
                    {errors.notice}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#479BC9]">
                  Current- Salary <span className="text-[#FF6600]">*</span>
                </label>
                <input
                  name="currentSalary"
                  value={form.currentSalary}
                  onChange={handleChange}
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  required
                />
                {errors.currentSalary && (
                  <div className="text-xs text-red-500 mt-1">
                    {errors.currentSalary}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#479BC9]">
                  Expected- Salary <span className="text-[#FF6600]">*</span>
                </label>
                <input
                  name="expectedSalary"
                  value={form.expectedSalary}
                  onChange={handleChange}
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  required
                />
                {errors.expectedSalary && (
                  <div className="text-xs text-red-500 mt-1">
                    {errors.expectedSalary}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-center items-center mt-8 md:col-span-2">
            <button
              type="submit"
              className="bg-[#56B9F0] text-white px-8 py-2 rounded font-semibold text-lg shadow cursor-pointer hover:bg-[#479BC9] transition-colors duration-300"
            >
              Submit
            </button>
          </div>
        </form>
        {showSuccessModal && (
          <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl px-8 py-6 max-w-md text-center animate-fade-in-up">
              <h2 className="text-2xl font-semibold text-[#2E3E95] mb-2">
                🎉 Thank You!
              </h2>
              <p className="text-gray-600 mb-4  ">
                Your application has been submitted successfully. <br />
                We truly appreciate your patience.
                <br />
                Our team will get back to you soon!
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-[#2E3E95] text-white px-6 py-2 rounded hover:bg-[#1c2e78] transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Footer links */}
        <div className="flex justify-center mt-8 text-[#56B9F0] text-sm">
          <a href="/careers" className="underline mr-2">
            View all jobs
          </a>{" "}
          •{" "}
          <a href="/" className="underline ml-2">
            Visit website
          </a>
        </div>
      </div>
    </div>
  );
}
