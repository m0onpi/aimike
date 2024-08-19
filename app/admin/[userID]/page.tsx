'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import prisma from '../../../lib/prisma';
interface Params {
  userID: string;
}

interface UserDetails {
  name: string;
  email: string;
  hasProject: boolean;
  hasBid: boolean;
  projectId: string;
  status: string;
  id: number;
  threadID:string;
}

interface Bid {
  id: number;
  bidder_id: number;
  amount: number;
  description: string;
  score: number;
  status: string;
}
interface Messages {
  message: string;
}

interface Thread {
  id: string;
}

interface UserDetailsPageProps {
  params: Params;
}

const UserDetailsPage = ({ params }: UserDetailsPageProps) => {
  const router = useRouter();
  const { userID } = params;
  const [userDetails, setUserDetails]  = useState<UserDetails>();
  const [bids, setBids] = useState<Bid[]>([]);
  const [thread, setThreads] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fetchingBids, setFetchingBids] = useState(false);
  const [fetchingThread, setFetchingThreads] = useState(false);
  const [confirmingBid, setConfirmingBid] = useState<number | null>(null);
  const [confirmingThread, setconfirmingThread] = useState(null); 
  const [messages, setMessages] = useState<Messages[]>([]);
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`/api/admin/userDetails/${userID}`);
        const data = await response.json();
        if (response.ok) {
          setUserDetails(data.user);
          console.log(data.user)
          
          
        } else {
          setError('Failed to fetch user details');
        }
      } catch (error) {
        setError('An error occurred while fetching user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userID]);

  const handleFetchBids = async (userId: string | undefined) => {
    setFetchingBids(true);
    setError('');
    
    try {
      const response = await fetch(`/api/admin/fetchBids`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (response.ok) {
        setBids(data.bids.bids);
        console.log(data.bids)
      } else {
        setError(`Error fetching bids: ${data.error}`);
      }
    } catch (error) {
      setError('An error occurred while fetching bids.');
    } finally{
      setFetchingBids(false);
    }
  };

  const handleFetchThread = async (userProjectId: string) => {
    setFetchingThreads(true);
    setError('');
    if (!userDetails?.threadID) {
      try {
        const response = await fetch(`/api/admin/fetchThread`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userProjectId }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          const threadId = data.threads.threads[0].id;
          setThreads(threadId);
  
          if (userDetails?.email) {
            // Make an API call to update the thread ID
            const updateResponse = await fetch('/api/admin/updateThread', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email: userDetails.email, threadID: `${threadId}` }),
            });
  
            if (!updateResponse.ok) {
              throw new Error('Failed to update thread ID in the database');
            }
          }
        } else {
          setError(`Error fetching thread: ${data.error}`);
        }
      } catch (error) {
        console.error('An error occurred while fetching threads:', error);
  
        if (error instanceof Error) {
          setError(`An error occurred: ${error.message}`);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setFetchingThreads(false);
      }
    }else {
      try {
        const response = await fetch(`/api/admin/getMessages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ threadID: userDetails.threadID }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          console.log(data)
          setMessages(data.messages)
        } else {
          setError(`Error fetching thread: ${data.error}`);
        }
      } catch (error) {
        console.error('An error occurred while fetching threads:', error);
  

    }
  }
};
  

  const handleConfirmBid = async (bidId: number) => {
    setConfirmingBid(bidId); // Set the current bid being confirmed
    setError('');

    try {
      const response = await fetch(`/api/admin/acceptBid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bidId }),
      });

      const data = await response.json();

      if (response.ok) {
        setBids(bids?.map(bid => bid.id === bidId ? { ...bid, status: 'confirmed' } : bid));
        await prisma.user.update({
          where: { email: userDetails?.email },
          data: { hasBid: true },
        })
      } else {
        setError(`Error confirming bid: ${data.error}`);
      }
    } catch (error) {
      setError('An error occurred while confirming the bid.');
    } finally {
      setConfirmingBid(null); // Clear the current bid being confirmed
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Details for {userID}</h1>

      {!userDetails?.hasBid ? (
        <div>
          <p><strong>Name:</strong> {userDetails?.name}</p>
          <p><strong>Email:</strong> {userDetails?.email}</p>
          <p><strong>Project Status:</strong> {userDetails?.hasProject ? 'Project Created' : 'No Project'}</p>

          {/* Button to fetch bids */}
          <button
            onClick={() => handleFetchBids(userDetails?.projectId)}
            className="bg-indigo-600 text-white py-2 px-4 rounded mt-4 hover:bg-indigo-700 disabled:bg-gray-400"
            disabled={fetchingBids}
          >
            {fetchingBids ? 'Fetching Bids...' : 'Fetch Bids'}
          </button>
          {/* Display bids if available */}
          {bids && (
            <div className="mt-8">
              <h2 className="text-xl font-bold">Bids:</h2>
              <ul>
                {bids.map((bid, index) => (
                  <li key={index} className="border-b py-2">
                    <p><strong>Bidder:</strong> {bid.bidder_id}</p>
                    <p><strong>Amount:</strong> ${bid.amount}</p>
                    <p><strong>Description:</strong> {bid.description}</p>
                    <p><strong>Reputation:</strong> {bid.score}</p>
                    <button
                      onClick={() => handleConfirmBid(bid.id)}
                      className="bg-green-600 text-white py-1 px-4 rounded mt-2 hover:bg-green-700 disabled:bg-gray-400"
                      disabled={confirmingBid === bid.id || bid.status === 'confirmed'}
                    >
                      {confirmingBid === bid.id ? 'Confirming...' : bid.status === 'confirmed' ? 'Confirmed' : 'Confirm Bid'}
                    </button>
                  </li>
                  
                  
                ))
                
                }
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div>
          <p><strong>Name:</strong> {userDetails?.name}</p>
          <button
                      onClick={() => handleFetchThread(userDetails?.projectId)}
                      className="bg-green-600 text-white py-1 px-4 rounded mt-2 hover:bg-green-700 disabled:bg-gray-400"
                      disabled={confirmingThread === userDetails.id || userDetails.status === 'confirmed'}
                    >
                      {confirmingThread === userDetails.id ? 'Confirming...' : userDetails.status === 'confirmed' ? 'Confirmed' : 'Confirm Thread'}
                    </button>
                    <p><strong> Thread: </strong> {userDetails?.threadID}</p>
                    <ul>
                {messages.map((message, index) => (
                  <li key={index} className="border-b py-2">
                    <p><strong>Message:</strong> {message.message}</p>

                  </li>
                  
                  
                ))
                
                }
              </ul>
        </div>
      
      )}

    </div>
  );
};

export default UserDetailsPage;
