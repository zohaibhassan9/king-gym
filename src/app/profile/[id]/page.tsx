import Layout from '@/components/Layout/Layout';
import MemberProfileClient from './MemberProfileClient';
import fs from 'fs';
import path from 'path';

export async function generateStaticParams() {
  try {
    // Read the members data file
    const membersFilePath = path.join(process.cwd(), 'data', 'members.json');
    const membersData = fs.readFileSync(membersFilePath, 'utf8');
    const members = JSON.parse(membersData);

    // Generate params for each member
    return members.map((member: any) => ({
      id: member.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params for profiles:', error);
    // Return empty array to prevent build failure
    return [];
  }
}

export default async function MemberProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <MemberProfileClient memberId={id} />;
}
