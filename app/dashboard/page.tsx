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
          title: 'New Project Title', // Customize this
          description: 'Project description goes here', // Customize this
          budget: {
            minimum: 10, // Example budget
            maximum: 100, // Example budget
          },
          currency: {
            id: 1, // Example currency ID
          },
          jobs: [{ id: 3 }], // Example job ID
          userEmail: email, // Pass the user's email
        }),
      });

      const data = await res.json();
      console.log(data, "test")

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
