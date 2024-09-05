import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Replace with your MongoDB login logic here
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      alert('Login successful');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="bg-black w-full min-h-screen flex items-center justify-center text-white">
      <form onSubmit={handleLogin} className="p-8 flex flex-col justify-center">
        <h1 className="text-5xl mb-10">Login</h1>

        <p className="text-gray-500 mb-5">
          Not a member?{' '}
          <Link to="/signup" className="text-orange-500">
            Signup
          </Link>
        </p>

        <input
          autoComplete="off"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="mt-5 transition duration-200 bg-transparent border border-orange-500 rounded-lg text-sm p-2.5 w-[300px] text-white focus:shadow-lg focus:rounded-full"
        />
        <label className="text-orange-500 mt-2 flex justify-between">
          Email <span className="material-symbols-outlined">mail</span>
        </label>

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="mt-5 transition duration-200 bg-transparent border border-orange-500 rounded-lg text-sm p-2.5 w-[300px] text-white focus:shadow-lg focus:rounded-full"
        />
        <label className="text-orange-500 mt-2 flex justify-between">
          Pass-Wall Password<span className="material-symbols-outlined">lock</span>
        </label>

        <button
          type="submit"
          className="self-start bg-orange-500 border border-orange-500 text-white w-24 p-2.5 text-lg rounded-full mt-7 transition-all duration-100 hover:shadow-[0_0_30px_rgba(249,172,90,1),0_0_10px_white_inset]"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
