import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='h-screen w-full flex flex-col justify-between bg-red-400 relative'>
      <h1 className='text-4xl font-extrabold text-white absolute top-4 left-4 z-10'>Uber</h1>
      <img
        className='w-full h-full object-cover absolute top-0 left-0 z-0'
        src="https://images.unsplash.com/photo-1557404763-69708cd8b9ce?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600"
        alt="Traffic light"
      />
      <div className='relative z-10 bg-white px-4 py-6 mt-auto'>
        <h2 className='text-2xl font-semibold text-center'>Get Started with Uber</h2>
        <Link
          to="/user-login"
          className='mt-6 mb-4 w-full text-center text-xl bg-black text-white py-3 rounded-xl block'
        >
          Continue &gt;
        </Link>
      </div>
    </div>
  )
}

export default Start