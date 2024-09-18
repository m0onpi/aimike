// components/News.tsx
"use client"
import React, { useRef, useState } from 'react';

export default function Subscribe() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const [message, setMessage] = useState('');

  const subscribe = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    if (res.ok){
      console.log(res.status)
      await fetch('/api/fb/signup', {
        body: JSON.stringify({
          email: emailRef.current.value,
          phone: phoneRef.current.value,
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
    }
    const { error } = await res.json();

    if (error) {
      setMessage(error);
      return;
    }

    firstNameRef.current.value = '';
    lastNameRef.current.value = '';
    emailRef.current.value = '';
    phoneRef.current.value = '';
    setMessage('Success! 🎉 You are now subscribed to the newsletter.');
    
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-grey rounded shadow-md">
      <h1 className="text-center font-bold text-2xl mb-4">Register Your Interest</h1>
      <form onSubmit={subscribe} className="space-y-4">
        <input className="w-full px-4 py-2 border rounded text-gray-800" 
          type="text" 
          placeholder="First Name" 
          ref={firstNameRef} 
          required 
        />
        <input className="w-full px-4 py-2 border rounded text-gray-800" 
          type="text" 
          placeholder="Last Name" 
          ref={lastNameRef} 
          required 
        />
        <input className="w-full px-4 py-2 border rounded text-gray-800" 
          type="email" 
          placeholder="Email" 
          ref={emailRef} 
          required 
        />
        <input className="w-full px-4 py-2 border rounded text-gray-800" 
          type="text" 
          placeholder="Phone Number" 
          ref={phoneRef} 
          required 
        />
        <div className="flex items-center">
        <span className="text-center mb-2">
            By submitting your email address, you agree to receiving marketing emails and promotions. You can unsubscribe at any time.</span>
        </div>
        <button className="w-full bg-gray-700 text-white py-2 rounded hover:bg-gray-600" type="submit">
          Subscribe
        </button>
        {message && <p className="mt-2 text-center">{message}</p>}
      </form>
    </div>
  );
}
