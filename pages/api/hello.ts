"use client"
import React, { useRef, useState } from 'react';
import { useTheme } from "next-themes"

export default function Subscribe() {
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === "system" ? systemTheme : theme
  // 1. Create a reference to the input so we can fetch/clear it's value.
  const inputEl = useRef(null);
  const inputNm = useRef(null)
  // 2. Hold a message in state to handle the response from our API.
  const [message, setMessage] = useState('');

  const subscribe = async (e) => {
    e.preventDefault();

    // 3. Send a request to our API with the user's email address.
    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: inputEl.current.value,
        name: inputNm.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const { error } = await res.json();

    if (error) {
      // 4. If there was an error, update the message in state.
      setMessage(error);

      return;
    }

    // 5. Clear the input value and show a success message.
    inputEl.current.value = '';
    inputNm.current.value = '';
    setMessage('Success! 🎉 You are now subscribed to the newsletter.');
  };

  return (
    <h1 className="my-10 text-center font-bold text-4xl">

    <form onSubmit={subscribe}>
    <label htmlFor="name-input"></label>
      <input className="bg-gray-200 px-4 py-2 mr-2 mt-2 text-gray-500 rounded font-semibold"
        id="name-input"
        name="name"
        placeholder="Human"
        ref={inputNm}
        required
        type="string"
      />
      <label htmlFor="email-input"></label>
      <input className="bg-gray-200 px-4 py-2 mr-2 mt-2 text-gray-500 rounded font-semibold"
        id="email-input"
        name="email"
        placeholder="you@awesome.com"
        ref={inputEl}
        required
        type="email"
      />
      
      <div>
      <br></br>

        {message
          ? message 
          : `I'll only send emails when new content is posted.`}
      </div>
      <br></br>
      <button className="text-neutral-100 font-semibold px-6 py-3 bg-teal-600 rounded shadow hover:bg-teal-700" type="submit">{'✨ Subscribe 💌'}</button>
    </form>
    </h1>

  );
}