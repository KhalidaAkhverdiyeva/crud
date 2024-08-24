
"use client";
import { useState } from 'react';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FileUploadInput from '../components/fileuploadinput';

export default function RegisterPage() {
  

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      profileImage: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      username: Yup.string().required('Username is required'),
      email: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required'),
      confirmPassword: Yup.string().required('Confirm password is required'),
      gender: Yup.string().required('Gender is required'),
      profileImage: Yup.mixed().required('Profile image is required'),
    }),
    onSubmit: (values) => {
      console.log('Form values:', values);

      formik.resetForm(); 
    },
  });
 

  const handleFileChange = (e:any ) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue('profileImage', reader.result); 
      };
      reader.readAsDataURL(file);
    } else {
      formik.setFieldValue('profileImage', null); 
    }
  };

  return (
    <main className="flex justify-center items-center">
      <div className='w-[1200px] h-[650px] flex justify-center items-center overflow-hidden shadow-md mt-[30px] border'>
      <div className="w-1/2 bg-gray-100">
        <img src="https://i.pinimg.com/564x/72/81/56/7281562b52b07a6a180c14fd0dfdf5a0.jpg" alt="Registration" className="object-cover w-full h-full" />
      </div>
   
      <div className="w-1/2 flex flex-col items-center justify-center p-8 bg-white">
        <h1 className="text-2xl font-bold mb-6">Registration</h1>
        <form onSubmit={formik.onSubmit} className="w-full max-w-lg space-y-6 ">
    
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              placeholder="First Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              placeholder="Last Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
    
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
          

          <input
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
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
                checked={formik.values.gender === 'male'}
                onChange={formik.handleChange}
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
                checked={formik.values.gender === 'female'}
                onChange={formik.handleChange}
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
                checked={formik.values.gender === 'Prefer not to say'}
                onChange={formik.handleChange}
                className="mr-2 "
                required
              />
              Prefer not to say
            </label>
          </div>
          <FileUploadInput 
              name = 'profileImage'
              onChange={handleFileChange}
              value={formik.values.profileImage}/>
          

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
