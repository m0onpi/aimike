"use client";

import { ReactNode, useState } from 'react';
import './globals.css';
import Link from 'next/link';
import { SessionProvider } from 'next-auth/react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <html lang="en">
      <head>
        <title>AI Mike</title>
        <meta name="description" content="AI Mike website" />
      </head>
      <body>
        <SessionProvider>
        <div className="flex flex-col min-h-screen">
          <header className="flex justify-between items-center p-4 bg-gray-900">
            <div className="text-2xl font-bold">AI Mike</div>
            <nav className="hidden md:flex space-x-4">
              <Link className="hover:underline" href="/" passHref>
                Home
              </Link>
              <Link className="hover:underline" href="/services/consulting" passHref>
                Consulting
              </Link>
              <Link className="hover:underline" href="/services/machine-learning" passHref>
                Machine Learning
              </Link>
              <Link className="hover:underline" href="/services/automation" passHref>
                Automation
              </Link>
              <Link className="hover:underline" href="/about" passHref>
                About
              </Link>
              <Link className="hover:underline" href="/contact" passHref>
                Contact
              </Link>
            </nav>
            <button className="md:hidden" onClick={toggleMenu}>
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                ></path>
              </svg>
            </button>
          </header>
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
            <nav className="flex flex-col space-y-2 p-4 bg-gray-800">
              <Link className="hover:underline" onClick={toggleMenu} href="/" passHref>
                Home
              </Link>
              <Link className="hover:underline" onClick={toggleMenu} href="/services/consulting" passHref>
                Consulting
              </Link>
              <Link className="hover:underline" onClick={toggleMenu} href="/services/machine-learning" passHref>
                Machine Learning
              </Link>
              <Link className="hover:underline" onClick={toggleMenu} href="/services/automation" passHref>
                Automation
              </Link>
              <Link className="hover:underline" onClick={toggleMenu} href="/about" passHref>
                About
              </Link>
              <Link className="hover:underline" onClick={toggleMenu} href="/contact" passHref>
                Contact
              </Link>
            </nav>
          </div>
          <main className="flex-grow">{children}</main>
          <footer className="text-center p-4 bg-gray-900">
            © 2024 AI Mike. All rights reserved.
          </footer>
        </div>
        </SessionProvider>
      </body>
    </html>
  );
};

export default Layout;
