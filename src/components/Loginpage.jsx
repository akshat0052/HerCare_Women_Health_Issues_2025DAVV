import React from 'react'
import { Link } from 'react-router-dom'

export default function Loginpage() {
  return (
    <div className='min-h-screen flex items-center justify-center px-4 py-20 pt-24 md:pt-28'>
      <div className='bg-white w-full max-w-sm md:max-w-md rounded-2xl shadow-xl p-6 md:p-8'>
        
        <h2 className='text-2xl md:text-3xl font-bold text-center text-pink-600 mb-6'>Welcome Back</h2>
        
        <div className='space-y-4'>
          <div>
            <label htmlFor="email" className='block text-gray-700 font-medium mb-1 text-sm md:text-base'>Email</label>
            <input 
              type="email" 
              placeholder='Enter your email'
              className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:outline-none focus:border-pink-400 transition text-sm md:text-base' 
            />
          </div>

          <div>
            <label htmlFor="Password" className='block text-gray-700 font-medium mb-1 text-sm md:text-base'>Password</label>
            <input 
              type="password" 
              placeholder='*********'
              className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:outline-none focus:border-pink-400 transition text-sm md:text-base' 
            />
          </div>

          <div className='text-right'>
            <a href="#" className='text-pink-600 hover:text-pink-700 text-sm'>Forgot password?</a>
          </div>

          <button className='w-full py-2.5 md:py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium transition shadow-md text-sm md:text-base'>
            Sign In
          </button>

          <div className='relative my-4'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-white text-gray-500'>or</span>
            </div>
          </div>

          <button className='w-full py-2.5 md:py-3 flex justify-center items-center gap-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm md:text-base'>
            <img 
              src="../assets/Google_logo-removebg-preview.png" 
              alt="Google"
              className='w-5 h-5 md:w-6 md:h-6' 
            />
            Sign in with Google
          </button>

          <p className='text-center text-sm text-gray-500 mt-2'>
            Don't have an account?{' '}
            <Link to="/Register" className='text-pink-600 hover:text-pink-700 font-medium'>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
