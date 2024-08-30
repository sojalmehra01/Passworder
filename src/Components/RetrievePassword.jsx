import React, { useState } from 'react';
import { SparklesCore } from './ui/SparklesCore'; // Adjust the path as needed

const RetrievePassword = () => {
  const [email, setEmail] = useState('');
  const [websiteName, setWebsiteName] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset message
    setMessage('');

    if (!email || !websiteName || !securityAnswer) {
      setError('Please fill in all fields.');
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Simulate an API call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError('');
      setMessage(`Password retrieval instructions for ${websiteName} have been sent to ${email}.`);
    }, 1000); // Simulate network delay
  };

  return (
    <div className="relative h-screen flex items-center justify-center"> {/* Flexbox to center content */}
      <SparklesCore
        id="sparkles"
        className="absolute inset-0 -z-10"
        background="#0d47a1" // Optional: adjust background color if needed
      />
      <div className="relative max-w-md mx-auto p-5 border border-gray-300 rounded-lg bg-transparent z-10"> {/* Made the background transparent */}
        <h2 className="text-center text-xl font-bold mb-4">Retrieve Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block mb-2 text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />

          <label htmlFor="website" className="block mb-2 text-gray-700">Website Name:</label>
          <input
            type="text"
            id="website"
            value={websiteName}
            onChange={(e) => setWebsiteName(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />

          <label htmlFor="securityAnswer" className="block mb-2 text-gray-700">WallPass Password</label>
          <input
            type="password"
            id="securityAnswer"
            value={securityAnswer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />

          {error && <p className="text-red-500 mb-4">{error}</p>}
          {message && <p className="text-green-500 mb-4">{message}</p>}

          <button 
            type="submit" 
            disabled={loading} 
            className={`w-full p-2 text-white rounded ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
          >
            {loading ? 'Retrieving...' : 'Retrieve Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RetrievePassword;
