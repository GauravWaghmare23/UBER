import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useUserData } from '../contexts/UserContext'

const UserRegister = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setUser } = useUserData();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newUser = {
      fullName: {
        firstName,
        lastName
      },
      email,
      password
    }

    const res = await axios.post(`/users/register`, newUser);

    if (res.status === 201) {
      const { user, token } = res.data;
      setUser(user);
      localStorage.setItem('token', token);
      localStorage.setItem('role', 'user');
      navigate('/home');
    }

    setFirstName("")
    setLastName("")
    setEmail("")
    setPassword("")
  }

  return (
    <div className='min-h-screen w-full py-8 bg-white relative'>
      <img
        className='w-28 absolute top-4 left-4'
        src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC9lZFwvNTUwOVwvNmNmOGVmM2YzMjFkMTA3YThmZGVjNjY1NjJlMmVmMzctMTYyMDM3Nzc0OC5haSJ9:postmates:9KZWqmYNXpeGs6pQy4UCsx5EL3qq29lhFS6e4ZVfQrs?width=2400"
        alt="Uber Logo"
      />
      <div className='max-w-md mx-6 mt-32'>
        <form onSubmit={handleSubmit} className='rounded-xl bg-white'>
          <h2 className='text-2xl font-semibold mb-6 text-center'>Create your account</h2>

          <div className='flex gap-4'>
            <div className='w-1/2'>
              <label className='block mb-2 text-sm font-medium text-gray-700'>First Name</label>
              <input
                name='firstName'
                type='text'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                minLength={3}
                placeholder='John'
                className='w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black'
              />
            </div>

            <div className='w-1/2'>
              <label className='block mb-2 text-sm font-medium text-gray-700'>Last Name</label>
              <input
                name='lastName'
                type='text'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                minLength={3}
                placeholder='Doe'
                className='w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black'
              />
            </div>
          </div>

          <label className='block mb-2 text-sm font-medium text-gray-700'>Email</label>
          <input
            name='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            minLength={3}
            placeholder='email@example.com'
            className='w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black'
          />

          <label className='block mb-2 text-sm font-medium text-gray-700'>Password</label>
          <input
            name='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            placeholder='••••••••'
            className='w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black'
          />

          <p className='text-xs text-gray-500 mb-4'>
            By signing up, you agree to Uber’s terms, privacy policy, and data usage for services.
          </p>

          <button
            type='submit'
            className='w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition'
          >
            Register
          </button>

          <p className='mt-2 text-center text-sm text-gray-600'>
            Already have an account?{' '}
            <Link to="/user-login" className='text-black font-medium'>
              Login
            </Link>
          </p>
        </form>

        <hr className='my-10 border-gray-300' />

        <Link
          to="/captain-register"
          className='flex items-center justify-center w-full py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition'
        >
          Register as Captain
        </Link>
      </div>
    </div>
  )
}

export default UserRegister