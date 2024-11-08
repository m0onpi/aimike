"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Calendar from 'react-calendar';
import "../globals.css";

const TIMES = ["8:30","9:30","10:30","11:30","12:30","13:30","14:30","15:30","16:30","17:30"]; // Available times

export default function BookForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [bookedTimes, setBookedTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchBookedTimes = async () => {
      setLoading(true);
      setBookedTimes([]);
      const dateString = selectedDate.toISOString().split('T')[0];
      const res = await fetch(`/api/book/getBookedTimes?date=${dateString}`);
      const data = await res.json();

      if (res.ok) {
        setBookedTimes(data.bookedTimes);
      } else {
        console.error(data.message);
      }
      setLoading(false);
    };
    fetchBookedTimes();
  }, [selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    if (!name || !email || !phone || !selectedDate || !selectedTime) {
      setErrorMessage('Please fill in all required fields and select a date and time.');
      setIsSubmitting(false);
      return;
    }

    try {
      const bookingDate = selectedDate.toISOString().split('T')[0];
      const bookingTime = selectedTime;
      const res = await fetch('/api/book/create-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, date: bookingDate, time: bookingTime }),
      });

      if (res.ok) {
        router.push('/');
      } else {
        const data = await res.json();
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-700 py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center">Book Now</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg">
          <div className="mb-4">
            <input
              required
              name="name"
              placeholder="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-600 text-black"
            />
          </div>
          <div className="mb-4">
            <input
              required
              name="email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-600 text-black"
            />
          </div>
          <div className="mb-4">
            <input
              required
              name="phone"
              placeholder="Phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-600 text-black"
            />
          </div>

          <div className="flex justify-center mb-4">
            <Calendar
              onChange={(date) => {
                setSelectedDate(date);
                setSelectedTime('');
              }}
              value={selectedDate}
              className="w-full border border-gray-300 rounded-lg shadow-md text-gray-800"
              tileDisabled={({ date }) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today || date.toDateString() === today.toDateString();
              }}
            />
          </div>

          <div className="text-center mb-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">{selectedDate.toDateString()}</h4>
            {loading ? (
              <p className="text-gray-600 mb-4">Loading available times...</p>
            ) : (
              <div className="flex justify-center flex-wrap gap-2">
                {TIMES.map((time) => (
                  <button
                    key={time}
                    type="button"
                    className={`px-4 py-2 rounded-md border border-gray-300 ${
                      selectedTime === time ? 'bg-black text-white' : 'bg-white text-gray-800 hover:bg-gray-100'
                    } ${bookedTimes.includes(time) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => !bookedTimes.includes(time) && setSelectedTime(time)}
                    disabled={bookedTimes.includes(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            )}
          </div>

          {errorMessage && <p className="text-indigo-600 mb-4 text-center">{errorMessage}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-full hover:bg-indigo-600 transition"
          >
            Book Now
          </button>
        </form>
      </div>
    </section>
  );
}
