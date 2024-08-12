// pages/dashboard.tsx
"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session) {
      router.push('/login'); // Redirect to login if not logged in
    } else if (session.user?.hasPaid !== true) {
      router.push('/payment'); // Redirect to payment page if the user hasn't paid
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session && session.user?.hasPaid) {
    return (
      <div>
        <h1>Welcome to your Dashboard</h1>
        {/* Render your dashboard content here */}
      </div>
    );
  }

  // Return null or a loading spinner while the redirect is happening
  return null;
}
