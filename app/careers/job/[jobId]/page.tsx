import CareerById from '../../components/CareerOpportunities/CareerById';
import { getJobById } from '../../../lib/api';

export default async function JobDetailPage({ params }: { params: { jobId: string } }) {
  const { jobId } = params;
  const job = await getJobById(jobId);

  if (!job) {
    return <div className="text-center py-20 text-xl">Job not found</div>;
  }

  const applyUrl = `/careers/job/${jobId}/apply`;

  return <CareerById job={job} showInterestedButton={true} applyUrl={applyUrl} />;
} 