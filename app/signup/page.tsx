'use client'
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const router = useRouter();

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        router.push('/login')
        
      } else {
        const data = await res.json();
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Join the AI Revolution</h1>
        <p className="mt-2 text-lg text-gray-600">
          Sign up to unlock cutting-edge AI solutions that transform your business.
        </p>
      </div>

      {/* Benefits Section */}
      <div className="max-w-md w-full space-y-6 mb-12">
        <div className="flex items-center space-x-4">
          <p className="text-gray-700">Access innovative AI tools and resources.</p>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-gray-700">Your data is secure with industry-leading practices.</p>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-gray-700">Accelerate your business growth with AI-driven insights.</p>
        </div>
      </div>

      {/* Signup Form */}
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 space-y-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Create your account
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150"
            >
              Sign up
            </button>
          </div>
        </form>

        {/* Trust Badges and Testimonials */}
      </div>

      <div className="text-sm text-gray-900 text-center mt-8">
        Already have an account?{'   '}
        <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
          Log in
        </Link>
      </div>
    </div>
  );
}
