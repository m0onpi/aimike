'use client';
import { useEffect, useState } from 'react';
import { useSession, signOut} from 'next-auth/react';
import { useRouter } from 'next/navigation';
const Dashboard =  () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectInfo, setProjectInfo] = useState<any>(null);

  useEffect(() => {
    if (status === 'loading') return; // Wait until the session is loaded

    if (!session) {
      // Redirect to login if the user is not logged in
      router.refresh()
      router.push('/login');
      return;
    }

    

    if (!session.user?.hasPaid) {
      // Redirect to payment page if the user hasn't paid
      router.refresh
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
          title: '30-45 Minutes AI Consultancy', // Customize this
          description: 'I need an AI expert to help a client understand how they can add AI into their business, you will show them what you can do for them, you must not talk about prices with them over the appointment, you must come back to me and give me a breakdown of the needs of the client, if all goes well you will be hired to do the project. english speaking only', // Customize this
          budget: {
            minimum: 15, // Example budget
            maximum: 30, // Example budget
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
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex flex-col items-center justify-center p-6">
    <div className="max-w-4xl bg-white rounded-lg shadow-lg p-8 text-center text-gray-900">
      <h1 className="text-5xl font-extrabold mb-4">Welcome to Your Dashboard</h1>
      <p className="text-lg mb-6">
        Congratulations on taking the first step towards revolutionizing your business with AI! We are thrilled to have you on board.
      </p>

      {projectInfo ? (
        <div>
          <h2 className="text-3xl font-bold mb-4">Your Project Details</h2>
          <div className="text-left">
            <p className="text-lg mb-2"><strong>Project ID:</strong> {projectInfo.id}</p>
            <p className="text-lg mb-2"><strong>Title:</strong> {projectInfo.title}</p>
            {/* Add more project details as needed */}
          </div>

          <div className="bg-blue-100 text-blue-800 p-4 rounded-lg shadow-md mt-6">
            <p className="text-lg">
              Your appointment is being scheduled. You will receive an email confirmation shortly with all the details.
            </p>
          </div>
        </div>
      ) : (
        <div className="text-lg">
          <p>No project information available at the moment.</p>
        </div>
      )}

      <div className="mt-8 flex flex-col md:flex-row md:justify-center space-y-4 md:space-y-0 md:space-x-4">
        <a
          href="/contact"
          className="inline-block bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
        >
          Contact Support
        </a>
        <button
          onClick={() => signOut()}
          className="inline-block bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  </div>

  );
};

export default Dashboard;
