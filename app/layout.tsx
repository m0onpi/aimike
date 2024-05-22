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
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/services" className="hover:underline">Services</Link>
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
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
