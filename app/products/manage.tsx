// app/products/manage.tsx
import { useSession, signIn, signOut } from 'next-auth/react';

const ManageProducts = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div>
        <h1>Access Denied</h1>
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Manage Products</h1>
      <button onClick={() => signOut()}>Sign Out</button>
      {/* Rest of the management code */}
    </div>
  );
};

export default ManageProducts;
