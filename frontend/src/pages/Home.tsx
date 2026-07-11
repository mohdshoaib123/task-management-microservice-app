import axios from 'axios'
import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Home = () => {
  const navigate = useNavigate()
  const token = useMemo(() => localStorage.getItem('token'), [])

  const handleLogout = async () => {
    try {
      await axios.post('https://api-gateway-1g0o.onrender.com/api/v1/user/logout', {}, { withCredentials: true })
    } catch {
      // ignore and proceed with client-side cleanup
    } finally {
      localStorage.removeItem('token')
      toast.success('Logged out successfully')
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="rounded-3xl bg-white p-10 shadow-xl">
          <h1 className="mb-4 text-3xl font-bold text-slate-900">Task Management App</h1>
          <p className="mb-6 text-slate-600">
            Create your account and start managing tasks with a simple workflow.
          </p>

          <div className="flex flex-col flex-wrap gap-3 sm:flex-row">
            {token ? (
              <>
                <Link
                  to="/tasks"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  View Tasks
                </Link>
                <Link
                  to="/create-task"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Create Task
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center rounded-full border border-rose-300 px-6 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-full border border-slate-900 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
