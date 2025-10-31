import React from 'react'

export default function Loginpage() {
  return (
    <>
      <div className='flex items-center h-screen bg-cover bg-center overflow-hidden bg-fixed'
       style={{ backgroundImage: "url('/assets/3682759.jpg')" }}>

        <div className='bg-white w-[25rem] h-[22rem] mt-[1rem] ml-[28rem] rounded-lg items-center justify-center flex'>
          <div className=''>
            <div>
              <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>

              <input type="email" placeholder='Enter your email'
                className=' w-[20rem] mt-[0.3rem] mb-[1.5rem] px-4 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-300 focus:outline-none' />
            </div>

            <div >
              <label htmlFor="Password" className='block text-gray-700 font-medium mb-1'>Password</label>
              <input type="password" placeholder='*********'
                className='w-[20rem] mt-[0.3rem] mb-[1.5rem] px-4 py-2 border border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-300 focus:outline-none' />
            </div>

            <div className='mb-[0.5rem]'>
              Forgot password
            </div>

            <div>
              <button 
              className='w-[20rem] h-[2.8rem] mb-[1.5rem] shadow-sm bg-white border border-gray-700 rounded-lg hover:bg-pink-400 transition focus:ring-2 focus:ring-pink-300'>
                 <a href="">sign in</a>
              </button>
            </div>

            <div className=''>
              <button
                className='w-[20rem] h-[2.8rem] flex justify-center items-center shadow-sm bg-white border border-gray-700 rounded-lg hover:bg-pink-400 transition focus:ring-2 focus:ring-pink-300'>
                <img src="../assets/Google_logo-removebg-preview.png" alt="googlelogo"
                  className='w-[2rem] h-[2rem] mr-[0.7rem]' />
                sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
