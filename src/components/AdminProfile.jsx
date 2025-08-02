import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminProfile() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const goToSignup = () => {
    navigate('/signup')
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { name, email });
    // Add logic to handle the form submission
  };

  const handleChangePassword = () => {
    navigate('/change-password')
  };

  const goToHome = () => {
    navigate('/dashboard')
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#749BC2] text-black">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <div className='flex justify-between items-center mb-6'>
        <h2 className="text-2xl font-bold text-center text-gray-800">Admin Profile</h2>
        <button
            onClick={goToHome}
            className="!bg-white !text-[#749BC2] !border-2 border-[#749BC2] w-12 h-12 !flex !items-center !justify-center !rounded-full transition-all duration-200 ease-in-out
          hover:!text-black hover:!border-black active:!text-black active:!border-black focus:!outline-none !leading-none !p-0"
          >
            <span
              className="text-[38px]"
              style={{ transform: "translateY(-3px)" }}
            >
              &times;
            </span>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleChangePassword}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
              style={{background:'#749BC2'}}

            >
              Change your password
            </button>
            <button
              type="button"
              onClick={goToSignup}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
              style={{background:'#749BC2'}}
            >
              Signup new Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
