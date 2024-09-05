import React, { useState } from 'react';
import { SparklesCore } from './ui/SparklesCore';
import zxcvbn from 'zxcvbn';

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
  const [strength, setStrength] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const generatePassword = () => {
    let userData = '';

    if (email) {
      const emailParts = email.split('@');
      if (emailParts.length > 1) {
        userData += emailParts[0];
        userData += emailParts[1].split('.')[0];
      } else {
        userData += email;
      }
    }

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

    if (phoneNumber) {
      const digitsOnly = phoneNumber.replace(/\D/g, '');
      userData += digitsOnly;
    }

    userData += websiteName;

    const specialChars = '!@#$%^&*+|<>?';
    userData += specialChars;

    const allChars = userData;

    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      result += allChars[Math.floor(Math.random() * allChars.length)];
    }

    if (!/[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(result)) {
      const randomSpecialChar = specialChars[Math.floor(Math.random() * specialChars.length)];
      result = result.slice(0, -1) + randomSpecialChar;
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

      const analysis = zxcvbn(generatedPassword);
      setStrength(analysis.score);
      setSuggestions(analysis.feedback.suggestions);
    }
  };

  const handleUpload = async () => {
    console.log('Uploading password:', password);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopyMessage('Password copied');
      setTimeout(() => setCopyMessage(''), 2000);
    });
  };

  const renderStrengthMeter = () => {
    if (strength !== null) {
      const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
      const strengthColors = ['red', 'orange', 'yellow', 'green', 'blue'];

      return (
        <div className="mt-4">
          <div className="flex justify-between">
            <p>Password Strength:</p>
            <p style={{ color: strengthColors[strength] }}>{strengthLabels[strength]}</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="h-2.5 rounded-full"
              style={{ width: `${(strength + 1) * 20}%`, backgroundColor: strengthColors[strength] }}
            ></div>
          </div>
          {suggestions.length > 0 && (
            <ul className="mt-2 text-sm text-gray-600">
              {suggestions.map((suggestion, index) => (
                <li key={index}>- {suggestion}</li>
              ))}
            </ul>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative min-h-screen">
      <SparklesCore
        className="absolute top-0 left-0 w-full h-full"
        minSize={0.5}
        maxSize={1}
        speed={4}
        particleColor="#ffffff"
        particleDensity={120}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-transparent p-5 rounded-lg shadow-lg max-w-md w-full">
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
                <button onClick={handleCopy} className="ml-3 text-blue-500 underline">Copy</button>
                {copyMessage && <span className="text-green-500 ml-2">{copyMessage}</span>}
              </p>
              {renderStrengthMeter()}
              <button onClick={handleUpload} className="w-full p-2 mt-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">
                Upload Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
