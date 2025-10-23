import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useUserData } from '../contexts/UserContext'

const CaptainLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setUser } = useUserData();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const loginUser = { email, password }
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, loginUser, { withCredentials: true });
    if (res.status == 201) {
      const data = res.data;
      setUser(data);
      localStorage.setItem("token", data.token)
      localStorage.setItem("role", "user")
      navigate("/home");
    }
    setEmail("")
    setPassword("")
  }


  return (
    <div className='min-h-screen w-full py-8 px-6 bg-white relative'>
      <img
        className='w-28 absolute top-4 left-4'
        src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC9lZFwvNTUwOVwvNmNmOGVmM2YzMjFkMTA3YThmZGVjNjY1NjJlMmVmMzctMTYyMDM3Nzc0OC5haSJ9:postmates:9KZWqmYNXpeGs6pQy4UCsx5EL3qq29lhFS6e4ZVfQrs?width=2400"
        alt="Uber Captain Logo"
      />

      <div className='max-w-md mx-auto mt-32'>
        <form onSubmit={handleSubmit} className='p-6 rounded-xl bg-white'>
          <h2 className='text-2xl font-semibold mb-6 text-center'>Login to your account</h2>

          <label className='block mb-2 text-sm font-medium text-gray-700'>Email</label>
          <input
            name='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='eamil@example.com'
            className='w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black'
          />

          <label className='block mb-2 text-sm font-medium text-gray-700'>Password</label>
          <input
            name='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='••••••••'
            className='w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black'
          />

          <button
            type='submit'
            className='w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition'
          >
            Login
          </button>

          <p className='mt-4 text-center text-sm text-gray-600'>
            Don't have an account?{' '}
            <Link to="/user-register" className='text-black font-medium'>
              Register
            </Link>
          </p>
        </form>

        <hr className='my-10 border-gray-300' />

        <Link
          to="/captain-login"
          className='flex items-center justify-center w-full py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition'
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin