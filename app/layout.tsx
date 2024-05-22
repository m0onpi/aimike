import { ReactNode } from 'react';
import './globals.css';
import Link from 'next/link';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
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
            <nav className="flex space-x-4">
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
          </header>
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
