import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCaptainData } from '../contexts/CaptainContext'

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setCaptain } = useCaptainData();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const loginData = { email, password };
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/captains/login`,
        loginData,
        { withCredentials: true }
      );
      
      if (res.status === 201) {
        const { captain, token } = res.data;
        setCaptain(captain); // Store the captain object, not the whole response
        localStorage.setItem("token", token);
        localStorage.setItem("role", "captain");
        navigate("/captain-home");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      setEmail("");
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className='min-h-screen w-full px-6 py-8 bg-white relative'>
      <img
        className='w-28 absolute top-4 left-4'
        src="https://cdn-assets-us.frontify.com/s3/frontify-enterprise-files-us/eyJwYXRoIjoicG9zdG1hdGVzXC9hY2NvdW50c1wvODRcLzQwMDA1MTRcL3Byb2plY3RzXC8yN1wvYXNzZXRzXC9lZFwvNTUwOVwvNmNmOGVmM2YzMjFkMTA3YThmZGVjNjY1NjJlMmVmMzctMTYyMDM3Nzc0OC5haSJ9:postmates:9KZWqmYNXpeGs6pQy4UCsx5EL3qq29lhFS6e4ZVfQrs?width=2400"
        alt="Uber Captain Logo"
      />

      <div className='max-w-md mx-auto mt-32'>
        <form onSubmit={handleSubmit} className='p-6 rounded-xl bg-white'>
          <h2 className='text-2xl font-semibold mb-6 text-center'>Captain Login</h2>

          <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-700'>Email</label>
          <input
            id='email'
            name='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='captain@example.com'
            className='w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black'
          />

          <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-700'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='••••••••'
            className='w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black'
          />

          {error && (
            <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded-lg">
              {error}
            </div>
          )}
          
          <button
            type='submit'
            disabled={isLoading}
            className={`w-full py-3 bg-black text-white rounded-lg font-semibold transition flex items-center justify-center
              ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-gray-900'}`}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              'Login'
            )}
          </button>

          <p className='mt-4 text-center text-sm text-gray-600'>
            Want to join the fleet?{' '}
            <Link to="/captain-register" className='text-black font-medium'>
              Register as Captain
            </Link>
          </p>
        </form>

        <hr className='my-10 border-gray-300' />

        <Link
          to="/user-login"
          className='flex items-center justify-center w-full py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 transition'
        >
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin