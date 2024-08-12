import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ComponentType } from 'react';

export function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  return function WithAuth(props: P) {
    const router = useRouter();
    const { data: session, status } = useSession();
    const isUser = !!session?.user;
    const isPaid = session?.user?.hasPaid;

    if (status === 'loading') {
      return <p>Loading...</p>;
    }

    if (!isUser) {
      router.replace('/login');
      return null;
    }

    if (!isPaid) {
      router.replace('/payment');
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}