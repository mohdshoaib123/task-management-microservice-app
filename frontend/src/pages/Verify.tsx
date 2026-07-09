import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const API_URL = 'https://api-gateway-latest-2.onrender.com/api/v1/user'

const Verify = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailLoaded, setEmailLoaded] = useState(false)

  useEffect(() => {
    const savedEmail = localStorage.getItem('verifyEmail')
    if (savedEmail) {
      setEmail(savedEmail)
    }
    setEmailLoaded(true)
  }, [])

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('')
    setError('')
    setIsLoading(true)

    try {
      const response = await axios.post(`${API_URL}/verify`, {
        email,
        otp,
      },{ withCredentials: true })
localStorage.setItem('token', response.data.token)
      setMessage(response.data.message || 'Verification successful.')
      toast.success(message)
      localStorage.removeItem('verifyEmail')
      
      setOtp('')
      setTimeout(() => {
        navigate('/')
      }, 1000)
    } catch (axiosError: unknown) {
      if (axios.isAxiosError(axiosError)) {
        setError(
          axiosError.response?.data?.err.message  || 'Verification failed',
        )
        toast.error(error)
      } else {
        setError('Unable to connect to the server.')
        toast.error(error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Verify your email</h1>

        {message ? <p className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p> : null}
        {error ? <p className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

        {emailLoaded && !email ? (
          <div className="rounded-3xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm text-rose-700">
            Email not found. Please register first or go back to login.
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-5">
          {email ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900">
              <p className="text-sm font-medium text-slate-700 mb-1">Verifying email</p>
              <p className="text-sm text-slate-600">{email}</p>
            </div>
          ) : null}

          <label className="block">
            <span className="text-sm font-medium text-slate-700">OTP</span>
            <input
              type="text"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900"
            />
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Back to{' '}
          <Link to="/login" className="font-semibold text-slate-900 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Verify
