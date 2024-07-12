// pages/index.js
"use client"
import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(await data.transcription)
    alert(`Transcription: ${data.transcription}`);
  };

  return (
    <div>
      <h1>Upload MP3 for Transcription</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="audio/mpeg" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
