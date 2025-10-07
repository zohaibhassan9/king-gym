import Layout from '@/components/Layout/Layout';
import MemberProfileClient from './MemberProfileClient';

export default async function MemberProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <MemberProfileClient memberId={id} />;
}
