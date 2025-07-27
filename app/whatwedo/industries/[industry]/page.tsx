// app/whatwedo/industries/[industry]/page.tsx
import { industriesData } from '../industriesData';
import { notFound } from 'next/navigation';
import IndustryTemplate from '../IndustryTemplate';

function normalizeKey(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]/gi, '');
}

export default function IndustryPage({ params }: { params: { industry: string } }) {
  const { industry } = params;
  const key = Object.keys(industriesData).find(
    k => normalizeKey(k) === normalizeKey(industry)
  );
  const data = key ? industriesData[key as keyof typeof industriesData] : undefined;

  if (!data) return notFound();

  return <IndustryTemplate data={data} />;
}
