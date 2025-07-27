export const jobData = [
  {
    category: 'Technology & Engineering',
    count: 6,
    jobs: [
      { type: 'Full Time', title: 'Software Engineer - I', location: 'Hyderabad, India', mode: 'On-site', image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=64&h=64&facepad=2' },
      { type: 'Hybrid', title: 'React Developer', location: 'Hyderabad, India', mode: 'Hybrid', image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=64&h=64&facepad=2' },
      { type: 'On-site', title: 'Software Engineer - II', location: 'Bangalore, Hyderabad, India', mode: 'On-site', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=64&h=64&facepad=2' },
      { type: 'Remote', title: 'Tech Lead - II', location: 'Hyderabad, India', mode: 'Remote', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=64&h=64&facepad=2' },
    ],
  },
  {
    category: 'Business & Support',
    count: 3,
    jobs: [
      { type: 'Full Time', title: 'HR Manager', location: 'Hyderabad, India', mode: 'On-site', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=64&h=64&facepad=2' },
      { type: 'Hybrid', title: 'Data Entry Executive', location: 'Hyderabad, India', mode: 'Hybrid', image: 'https://images.unsplash.com/photo-1519340333755-c6e2a6a1b8a5?auto=format&fit=facearea&w=64&h=64&facepad=2' },
      { type: 'On-site', title: 'Business Development Executive', location: 'Bangalore, Hyderabad, India', mode: 'On-site', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=64&h=64&facepad=2' },
    ],
  },
];

export const allDepartments = ['All Departments', ...jobData.map(j => j.category)];
export const allLocations = ['All Locations', ...Array.from(new Set(jobData.flatMap(j => j.jobs.map(job => job.location))))]; 