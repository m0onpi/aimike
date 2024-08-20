'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectInfo, setProjectInfo] = useState<any>(null);

  useEffect(() => {
    if (status === 'loading') return; // Wait until the session is loaded

    if (!session) {
      // Redirect to login if the user is not logged in
      router.push('/login');
      return;
    }

    if (!session.user?.hasPaid) {
      // Redirect to payment page if the user hasn't paid
      router.push('/payment');
      return;
    }

    if (session.user?.hasProject) {
      // Fetch existing project details if the user has an associated project
      fetchProjectDetails(session.user.projectId);
    } else if (session.user?.hasPaid && !session.user?.hasProject) {
      // Create a new project if the user has paid but doesn't have a project
      createNewProject(session.user.email);
    } else {
      setLoading(false); // No need to create a project, stop loading
    }
  }, [session, status, router]);

  const fetchProjectDetails = async (projectId: string | null | undefined) => {
    if (!projectId) {
      setError('Project ID not found');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      if (res.ok && data.result) {
        console.log(data)
        setProjectInfo(data.result);
      } else {
        setError(data.error || 'Failed to fetch project details');
      }
      setLoading(false);
    } catch (err) {
      setError('An error occurred while fetching project details');
      setLoading(false);
    }
  };

  const createNewProject = async (email: string | null | undefined) => {
    if (!email) {
      setError('User email not found');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: '1-2HR AI Consultancy', // Customize this
          description: 'I need an AI expert to help a client understand how he can add AI into his business, you will show them what you can do for them, you must not talk about prices with them over the appointment, just tell them we can price it after but focus on finding the solution they need, you must come back to me and give me a breakdown of the needs of the client, if all goes well you will be hired to do the project. english speaking only', // Customize this
          budget: {
            minimum: 30, // Example budget
            maximum: 60, // Example budget
          },
          currency: {
            id: 4, // Example currency ID
          },
          jobs: [{ id: 913 }], // Example job ID
          userEmail: email, // Pass the user's email
        }),
      });

      const data = await res.json();

      if (data) {
        fetchProjectDetails(data.projectId)
      } else {
        setError(data.error || 'Failed to create project');
        setLoading(false);
      }
    } catch (err) {
      setError('An error occurred while creating the project');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      {projectInfo ? (
        <div>
          <h2>Project Details</h2>
          <p>Project ID: {projectInfo.id}</p>
          <p>Title: {projectInfo.title}</p>
          <p>Status: {projectInfo.status}</p>
          <p>Description: {projectInfo.preview_description}</p>
          {/* Display more project details as needed */}
        </div>
      ) : (
        <p>No project information available.</p>
      )}
    </div>
  );
};

export default Dashboard;
