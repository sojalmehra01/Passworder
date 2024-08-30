import React, { useState } from 'react';
import { SparklesCore } from './ui/SparklesCore';

const Landing = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [websiteName, setWebsiteName] = useState('');
  const [passwordLength, setPasswordLength] = useState('');
  const [buttonText, setButtonText] = useState('Generate Password');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  const generatePassword = () => {
    let userData = '';

    // Use parts of the email
    if (email) {
      const emailParts = email.split('@');
      if (emailParts.length > 1) {
        userData += emailParts[0]; // username part
        userData += emailParts[1].split('.')[0]; // domain part before '.'
      } else {
        userData += email;
      }
    }

    // Ensure at least one uppercase letter from the name
    let nameWithUppercase = name;
    if (name) {
      const uppercaseInName = /[A-Z]/.test(name);
      if (!uppercaseInName) {
        const randomIndex = Math.floor(Math.random() * name.length);
        nameWithUppercase =
          name.slice(0, randomIndex) +
          name[randomIndex].toUpperCase() +
          name.slice(randomIndex + 1);
      }
    }
    userData += nameWithUppercase;

    // Use digits from the phone number
    if (phoneNumber) {
      const digitsOnly = phoneNumber.replace(/\D/g, ''); // Remove non-digits
      userData += digitsOnly;
    }

    // Use characters from the website name
    userData += websiteName;

    // Add special characters to userData to ensure inclusion
    const specialChars = '!@#$%^&*+|<>?';
    userData += specialChars;

    // Make sure all inputs are used to generate a more diverse set of characters
    const allChars = userData;

    // Generate the password using the collected characters
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      result += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Ensure at least one special character is in the password
    if (!/[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(result)) {
      const randomSpecialChar = specialChars[Math.floor(Math.random() * specialChars.length)];
      result = result.slice(0, -1) + randomSpecialChar; // Replace the last character
    }

    return result;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (passwordLength < 8) {
      setError('Password cannot be smaller than 8 characters.');
    } else {
      setError('');
      const generatedPassword = generatePassword();
      setPassword(generatedPassword);
      console.log('Generated Password:', generatedPassword);
      setButtonText('Regenerate Password');
    }
  };

  const handleUpload = async () => {
    console.log('Uploading password:', password);
    // Call your API to upload the password
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopyMessage('Password copied');
      setTimeout(() => setCopyMessage(''), 2000); // Clear the message after 2 seconds
    });
  };

  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden">
      {/* SparklesCore component for background effect */}
      <SparklesCore
        className="absolute inset-0"
        minSize={0.5} // Set minimum size for particles
        maxSize={1} // Set maximum size for particles
        speed={4}
        particleColor="#ffffff"
        particleDensity={120}
      />

      {/* Content of Landing Page */}
      <div className="relative bg-transparent p-5 rounded-lg shadow-lg max-w-md w-full z-10">
        <h2 className="text-2xl font-semibold mb-5 text-center text-gray-800">Password Generator</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-gray-600 mb-2">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg bg-transparent backdrop-filter backdrop-blur-md text-gray-800"
          />

          <label htmlFor="name" className="block text-gray-600 mb-2">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg bg-transparent backdrop-filter backdrop-blur-md text-gray-800"
          />

          <label htmlFor="phone" className="block text-gray-600 mb-2">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg bg-transparent backdrop-filter backdrop-blur-md text-gray-800"
          />

          <label htmlFor="website" className="block text-gray-600 mb-2">Website Name:</label>
          <input
            type="text"
            id="website"
            value={websiteName}
            onChange={(e) => setWebsiteName(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg bg-transparent backdrop-filter backdrop-blur-md text-gray-800"
          />

          <label htmlFor="length" className="block text-gray-600 mb-2">Desired Password Length:</label>
          <input
            type="number"
            id="length"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
            min="8"
            max="20"
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg bg-transparent backdrop-filter backdrop-blur-md text-gray-800"
          />

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
            {buttonText}
          </button>
        </form>

        {password && (
          <div className="mt-5">
            <p className="mb-3">
              Generated Password: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{password}</span>
              <button onClick={handleCopy} className="ml-2 p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">Copy</button>
            </p>
            {copyMessage && <p className="text-green-500">{copyMessage}</p>}
            <button onClick={handleUpload} className="w-full p-2 mt-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">Upload Password</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
