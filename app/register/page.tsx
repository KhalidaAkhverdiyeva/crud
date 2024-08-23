// pages/register.js
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    password: '',
    confirmPassword: '',
    email: '',
    username: ''
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
  };

  return (
    <main className="flex justify-center items-center ">
      <div className='w-[1200px] h-[650px] flex justify-center items-center overflow-hidden shadow-md mt-[30px] border'>
      <div className="w-1/2 bg-gray-100">
        <img src="https://i.pinimg.com/564x/72/81/56/7281562b52b07a6a180c14fd0dfdf5a0.jpg" alt="Registration" className="object-cover w-full h-full" />
      </div>
   
      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-bold mb-6">Registration</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
    
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
    
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
          

          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
           <div className="flex items-center gap-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={form.gender === 'male'}
                onChange={handleChange}
                className="mr-2 "
                required
              />
              Male
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={form.gender === 'female'}
                onChange={handleChange}
                className="mr-2"
                required
              />
              Female
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="Prefer not to say"
                checked={form.gender === 'Prefer not to say'}
                onChange={handleChange}
                className="mr-2 "
                required
              />
              Prefer not to say
            </label>
          </div>
          <input type="file" placeholder='Profile Image' className='w-full px-4 py-2 border border-gray-300 rounded-md' />
          

          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#E3411A] text-white rounded-md"
          >
            Next
          </button>

          <div className="text-center mt-4">
            <span className="text-gray-600">Already have an account?</span>
            <a href="/" className="text-[#E3411A] ml-2">Login</a>
          </div>
        </form>
      </div>
      </div>

     
    </main>
  );
}
