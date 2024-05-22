import { ReactNode, useState } from 'react';
import '../globals.css';
import Link from 'next/link';

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
        <div className="flex flex-col min-h-screen">
          <header className="flex justify-between items-center p-4 bg-gray-900">
            <div className="text-2xl font-bold">AI Mike</div>
            <nav className="hidden md:flex space-x-4">
              <Link href="/" passHref>
                <a className="hover:underline">Home</a>
              </Link>
              <Link href="/services/consulting" passHref>
                <a className="hover:underline">Consulting</a>
              </Link>
              <Link href="/services/machine-learning" passHref>
                <a className="hover:underline">Machine Learning</a>
              </Link>
              <Link href="/services/automation" passHref>
                <a className="hover:underline">Automation</a>
              </Link>
              <Link href="/about" passHref>
                <a className="hover:underline">About</a>
              </Link>
              <Link href="/contact" passHref>
                <a className="hover:underline">Contact</a>
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
              <Link href="/" passHref>
                <a className="hover:underline" onClick={toggleMenu}>Home</a>
              </Link>
              <Link href="/services/consulting" passHref>
                <a className="hover:underline" onClick={toggleMenu}>Consulting</a>
              </Link>
              <Link href="/services/machine-learning" passHref>
                <a className="hover:underline" onClick={toggleMenu}>Machine Learning</a>
              </Link>
              <Link href="/services/automation" passHref>
                <a className="hover:underline" onClick={toggleMenu}>Automation</a>
              </Link>
              <Link href="/about" passHref>
                <a className="hover:underline" onClick={toggleMenu}>About</a>
              </Link>
              <Link href="/contact" passHref>
                <a className="hover:underline" onClick={toggleMenu}>Contact</a>
              </Link>
            </nav>
          </div>
          <main className="flex-grow">{children}</main>
          <footer className="text-center p-4 bg-gray-900">
            © 2024 AI Mike. All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  );
};

export default Layout;
