import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const API_URL = 'https://api-gateway-1g0o.onrender.com/api/v1/user'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('')
    setError('')
    setIsLoading(true)

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      },{ withCredentials: true })
localStorage.setItem("token",response.data.token)
      setMessage(response.data.message || 'Login successful.')
      toast.success(message)
      setEmail('')
      setPassword('')
      setTimeout(() => {
        navigate('/')
      }, 1000)
    } catch (axiosError: unknown) {
      if (axios.isAxiosError(axiosError)) {
        setError(
        axiosError.response?.data?.error || 'Login failed',)
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
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Login to your account</h1>

        {message ? <p className="mb-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</p> : null}
        {error ? <p className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900"
            />
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Not an existing user?{' '}
          <Link to="/register" className="font-semibold text-slate-900 underline">
            Register here
          </Link>
        </p>

        <p className="mt-3 text-center text-sm text-slate-600">
          Need to verify your email?{' '}
          <Link to="/verify" className="font-semibold text-slate-900 underline">
            Enter OTP
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
