"use client"

import { ReactNode, useState } from 'react';
import './globals.css';
import Link from 'next/link';
import { SessionProvider } from 'next-auth/react';
import Script from "next/script";
import { Analytics } from '@vercel/analytics/react';

export default function Layout({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For dropdown state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  

  return (
    <SessionProvider>

    <html lang="en">
      <head>
        <title>AI Mike</title>
        <meta name="description" content="Discover AI Mike: Your ultimate AI-powered solution for automated websites and systems. Boost efficiency, save time, and transform your business today!" />
        <script id="vtag-ai-js" async src="https://r2.leadsy.ai/tag.js" data-pid="DQC1s32lVIm8ccLG" data-version="062024"></script>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-4JMSXPM6G4`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4JMSXPM6G4', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        {/* End Google Analytics */}
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          <header className="flex justify-between items-center p-4 bg-gray-900">
            <Link className="text-2xl font-bold" href="/" passHref>
                AI Mike
              </Link>
            <nav className="hidden md:flex space-x-4">
              <Link className="hover:underline" href="/" passHref>
                Home
              </Link>
              <Link className="hover:underline" href="/dashboard" passHref>
                Dashboard
              </Link>
              <Link className="hover:underline" href="/blog" passHref>
                Blog
              </Link>
              <div className="relative">
                <button className="hover:underline" onClick={toggleDropdown}>
                  Services
                </button>
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                    <Link className="block px-4 py-2 text-gray-700 hover:bg-gray-200" href="/services/consulting" passHref>
                      Consulting
                    </Link>
                    <Link className="block px-4 py-2 text-gray-700 hover:bg-gray-200" href="/services/machine-learning" passHref>
                      Machine Learning
                    </Link>
                    <Link className="block px-4 py-2 text-gray-700 hover:bg-gray-200" href="/services/automation" passHref>
                      Automation
                    </Link>
                  </div>
                )}
              </div>
              <Link className="hover:underline" href="/about" passHref>
                About
              </Link>
              <Link className="hover:underline" href="/contact" passHref>
                Contact
              </Link>
              <Link className="hover:underline" href="/signup" passHref>
                Sign Up
              </Link>
              <Link className="hover:underline" href="/login" passHref>
                Login
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
              <Link className="hover:underline" onClick={toggleMenu} href="/dashboard" passHref>
                Dashboard
              </Link>
              <Link className="hover:underline" onClick={toggleMenu} href="/blog" passHref>
                Blog
              </Link>
                <button className="hover:underline" onClick={toggleDropdown}>
                  Services
                </button>
                {/* Mobile Dropdown */}
                {isDropdownOpen && (
                  <div className="mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                    <Link className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={toggleMenu} href="/services/consulting" passHref>
                      Consulting
                    </Link>
                    <Link className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={toggleMenu} href="/services/machine-learning" passHref>
                      Machine Learning
                    </Link>
                    <Link className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={toggleMenu} href="/services/automation" passHref>
                      Automation
                    </Link>
                  </div>
                )}
              <Link className="hover:underline" onClick={toggleMenu} href="/about" passHref>
                About
              </Link>
              <Link className="hover:underline" onClick={toggleMenu} href="/contact" passHref>
                Contact
              </Link>
              <Link className="hover:underline" onClick={toggleMenu} href="/signup" passHref> 
                  Sign Up 
              </Link>
              <Link className="hover:underline" onClick={toggleMenu} href="/login" passHref> 
                 Login 
              </Link>
            </nav>
          </div>
          <main>
            {children}
            <Analytics />
            </main>
          <footer className="text-center p-4 bg-gray-900 text-white">
            <div className="mb-2">
              © 2024 AI Mike. All rights reserved.
            </div>
            <div>
              <Link href="/tos" passHref>
                Terms and Conditions
              </Link>
            </div>
          </footer>
          <Script
            id="facebook-pixel"
            strategy="afterInteractive"
          >
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1037521884343984');
              fbq('track', 'PageView');
            `}
          </Script>

          

        </div>
      </body>
    </html>
    </SessionProvider>

  );
};
