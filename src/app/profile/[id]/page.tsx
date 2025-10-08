import Layout from '@/components/Layout/Layout';
import MemberProfileClient from './MemberProfileClient';

// Generate static params for all member profiles
export async function generateStaticParams() {
  try {
    // Try to read from the data files directly during build
    const fs = await import('fs');
    const path = await import('path');
    
    // Try to read members from the data directory
    const dataPath = path.join(process.cwd(), 'data', 'members.json');
    
    if (fs.existsSync(dataPath)) {
      const membersData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      const members = Array.isArray(membersData) ? membersData : [];
      
      return members.map((member: any) => ({
        id: member.id?.toString() || member.memberId?.toString() || '',
      })).filter((param: any) => param.id);
    }
    
    // Fallback: return a default profile for build
    return [{ id: 'default' }];
  } catch (error) {
    console.error('Error generating static params:', error);
    // Return a default profile to prevent build failure
    return [{ id: 'default' }];
  }
}

export default async function MemberProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <MemberProfileClient memberId={id} />;
}
