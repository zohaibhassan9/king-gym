import Layout from '@/components/Layout/Layout';
import MemberProfileClient from './MemberProfileClient';

// Generate static params for all member profiles
export async function generateStaticParams() {
  try {
    // Import the client database to get member IDs
    const { default: clientDb } = await import('../../../../lib/client-database');
    const members = clientDb.getMembers();
    
    // Return array of params for each member
    return members.map((member: any) => ({
      id: member.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    // Return empty array if there's an error to prevent build failure
    return [];
  }
}

export default async function MemberProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <MemberProfileClient memberId={id} />;
}
