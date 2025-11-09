import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


export default function Header() {
  return (
    <>
      <div className='flex items-center'>
        <div className='fixed top-0 left-0 z-50 bg-white h-[4.5rem] w-[55%] mt-7 flex justify-center items-center ml-[21rem] rounded-full shadow-md font-medium border-pink-950 border'>

          <nav className='flex gap-[2.5rem] text-gray-900 justify-center items-center text-[18px]'>

            <Link to="/" className='hover:text-pink-600 transition'>
              <img src="../assets/Screenshot 1.0.png" alt="Logo img"
                className='ml-[-1rem] mt-[-1rem] h-[2.5rem] w-[9rem] ' />
            </Link>
            <Link to="/" className='hover:text-pink-600 transition ml-[-1rem]'>Home</Link>
            <Link to="/about" className='hover:text-pink-600 transition'>ChatBot</Link>
            <Link to="/disease" className='hover:text-pink-600 transition'>Disease</Link>
            <Link to="/tips" className='hover:text-pink-600 transition'>Period Tracker</Link>
            <Link to="/login" className='hover:text-pink-600 transition'>Login</Link>
          </nav>
        </div>

      </div>
    </>
  )
}
