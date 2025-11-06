import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCaptainData } from '../contexts/CaptainContext'

const CaptainRegister = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [color, setColor] = useState("")
  const [plate, setPlate] = useState("")
  const [capacity, setCapacity] = useState("")
  const [vehicleType, setVehicleType] = useState("")
  const navigate = useNavigate()
  const {setCaptain} = useCaptainData();

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newUser = {
      fullName: {
        firstName,
        lastName
      },
      email,
      password,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType
      }
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/captains/register`, newUser, {
        withCredentials: true
      })

      if (res.status === 201) {
        const { captain, token } = res.data;
        setCaptain(captain);
        localStorage.setItem('token', token);
        localStorage.setItem('role', 'captain');
        navigate('/captain-home');
      }
    } catch (err) {
      console.error("Registration failed:", err)
    }

    setFirstName("")
    setLastName("")
    setEmail("")
    setPassword("")
    setColor("")
    setPlate("")
    setCapacity("")
    setVehicleType("")
  }

  return (
    <div className='min-h-screen w-full py-8 bg-white relative'>
      <img
        className='w-28 absolute top-4 left-4'
        src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC9lZFwvNTUwOVwvNmNmOGVmM2YzMjFkMTA3YThmZGVjNjY1NjJlMmVmMzctMTYyMDM3Nzc0OC5haSJ9:postmates:9KZWqmYNXpeGs6pQy4UCsx5EL3qq29lhFS6e4ZVfQrs?width=2400"
        alt="Uber Captain Logo"
      />
      <div className='max-w-md mx-6 mt-32'>
        <form onSubmit={handleSubmit} className='rounded-xl bg-white'>
          <h2 className='text-2xl font-semibold mb-6 text-center'>Register as Captain</h2>

          <div className='flex gap-4'>
            <div className='w-1/2'>
              <label className='block mb-2 text-sm font-medium text-gray-700'>First Name</label>
              <input
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
                type='text'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                minLength={3}
                placeholder='Doe'
                className='w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black'
              />
            </div>
          </div>

          <label className='block mb-2 text-sm font-medium text-gray-700'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='captain@example.com'
            className='w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black'
          />

          <label className='block mb-2 text-sm font-medium text-gray-700'>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            placeholder='••••••••'
            className='w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black'
          />

          <label className='block mb-2 text-sm font-medium text-gray-700'>Vehicle Color</label>
          <input
            type='text'
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
            placeholder='Red'
            className='w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black'
          />

          <label className='block mb-2 text-sm font-medium text-gray-700'>Vehicle Plate</label>
          <input
            type='text'
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            required
            placeholder='MH12AB1234'
            className='w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black'
          />

          <label className='block mb-2 text-sm font-medium text-gray-700'>Vehicle Capacity</label>
          <input
            type='number'
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
            placeholder='4'
            className='w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black'
          />

          <label className='block mb-2 text-sm font-medium text-gray-700'>Vehicle Type</label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
            className='w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black'
          >
            <option value="">Select type</option>
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="auto">Auto</option>
          </select>

          <p className='text-xs text-gray-500 mb-2'>
            By registering, you agree to Uber’s terms, privacy policy, and data usage for services.
          </p>
          <p className='text-xs text-gray-500 mb-4'>
            As a captain, you also consent to location tracking, trip history storage, and rider safety protocols.
          </p>

          <button
            type='submit'
            className='w-full py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition'
          >
            Register
          </button>

          <p className='mt-2 text-center text-sm text-gray-600'>
            Already a captain?{' '}
            <Link to="/captain-login" className='text-black font-medium'>
              Login
            </Link>
          </p>
        </form>

        <hr className='my-10 border-gray-300' />

        <Link
          to="/user-register"
          className='flex items-center justify-center w-full py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition'
        >
          Register as User
        </Link>
      </div>
    </div>
  )
}

export default CaptainRegister