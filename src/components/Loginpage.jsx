import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Loginpage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login, googleLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      setIsSubmitting(true);
      setError('');
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsSubmitting(true);
      setError('');
      await googleLogin();
      navigate('/');
    } catch (err) {
      setError(err.message || 'Google Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center px-4 py-20 pt-24 md:pt-28'>
      <div className='bg-white w-full max-w-sm md:max-w-md rounded-2xl shadow-xl p-6 md:p-8'>
        
        <h2 className='text-2xl md:text-3xl font-bold text-center text-pink-600 mb-6'>Welcome Back</h2>
        
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor="email" className='block text-gray-700 font-medium mb-1 text-sm md:text-base'>Email</label>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:outline-none focus:border-pink-400 transition text-sm md:text-base' 
            />
          </div>

          <div>
            <label htmlFor="Password" className='block text-gray-700 font-medium mb-1 text-sm md:text-base'>Password</label>
            <input 
              type="password" 
              id="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='*********'
              className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:outline-none focus:border-pink-400 transition text-sm md:text-base' 
            />
          </div>

          <div className='text-right'>
            <a href="#" className='text-pink-600 hover:text-pink-700 text-sm'>Forgot password?</a>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button disabled={isSubmitting} type="submit" className='w-full py-2.5 md:py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium transition shadow-md text-sm md:text-base'>
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>

          <div className='relative my-4'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-white text-gray-500'>or</span>
            </div>
          </div>

          <button type="button" onClick={handleGoogleLogin} className='w-full py-2.5 md:py-3 flex justify-center items-center gap-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm md:text-base'>
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
        </form>
      </div>
    </div>
  )
}
