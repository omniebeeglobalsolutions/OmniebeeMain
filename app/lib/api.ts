const INFO_API_URL = "https://omniebee-server.vercel.app/api/info";

export type Info = {
  employees: number;
  clients: number;
  partners: number;
  projects: number;
};

export async function getInfoData(): Promise<Info | null> {
  try {
    const res = await fetch(INFO_API_URL, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch info: ${res.status}`);
    }
    
    const data = await res.json();
    
    if (Array.isArray(data) && data.length > 0) {
      return {
        employees: data[0].employees,
        clients: data[0].clients,
        partners: data[0].partners,
        projects: data[0].projects,
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching info data:", error);
    return null;
  }
} 

export type Job = {
  _id: string;
  title: string;
  postedDate: string;
  workExperience: number;
  industry: string;
  role: string;
  whatYouWillDo: string;
  whatYouWillBring: string;
  location: string;
  jobType: string;
  __v: number;
};

export async function getJobsData(): Promise<Job[]> {
  try {
    const res = await fetch("https://omniebee-server.vercel.app/api/jobs", {
      next: { revalidate: 600 }, // Cache for 10 minutes
    });
    if (!res.ok) throw new Error(`Failed to fetch jobs: ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching jobs data:", error);
    return [];
  }
} 

export async function getJobById(jobId: string): Promise<Job | null> {
  try {
    const res = await fetch("https://omniebee-server.vercel.app/api/jobs", {
      next: { revalidate: 600 }, // Cache for 10 minutes
    });
    if (!res.ok) throw new Error(`Failed to fetch jobs: ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data)) {
      return data.find((j: Job) => j._id === jobId) || null;
    }
    return null;
  } catch (error) {
    console.error("Error fetching job by id:", error);
    return null;
  }
} 