import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const API_URL = 'https://api-gateway-1g0o.onrender.com/api/v1/task'

type TaskItem = {
  id: string
  title: string
  description: string
  priority: string
  status: string
  dueDate?: string | null
}

const UpdateTask = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM')
  const [status, setStatus] = useState<'TODO' | 'IN_PROGRESS' | 'DONE'>('TODO')
  const [dueDate, setDueDate] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) return

      try {
        setIsLoading(true)
        const response = await axios.get(`${API_URL}/fetchsingletask/${id}`, { withCredentials: true })
        const taskData: TaskItem = response.data?.data?.task
        setTitle(taskData?.title || '')
        setDescription(taskData?.description || '')
        setPriority((taskData?.priority as 'LOW' | 'MEDIUM' | 'HIGH') || 'MEDIUM')
        setStatus((taskData?.status as 'TODO' | 'IN_PROGRESS' | 'DONE') || 'TODO')
        setDueDate(taskData?.dueDate ? new Date(taskData.dueDate).toISOString().slice(0, 10) : '')
      } catch (axiosError: unknown) {
        const fallbackError = 'Unable to load task for editing.'
        if (axios.isAxiosError(axiosError)) {
          const serverError = axiosError.response?.data?.error || axiosError.response?.data?.err?.message || fallbackError
          setError(serverError)
          toast.error(serverError)
        } else {
          setError(fallbackError)
          toast.error(fallbackError)
        }
      } finally {
        setIsLoading(false)
      }
    }

    void fetchTask()
  }, [id])

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!id) return

    try {
      setIsSaving(true)
      setError('')
      const response = await axios.put(
        `${API_URL}/update/${id}`,
        { title, description, priority, status, dueDate: dueDate || undefined },
        { withCredentials: true },
      )
      const successMessage = response.data?.data?.message || 'Task updated successfully.'
      toast.success(successMessage)
      navigate(`/tasks/${id}`)
    } catch (axiosError: unknown) {
      const fallbackError = 'Unable to update this task.'
      if (axios.isAxiosError(axiosError)) {
        const serverError = axiosError.response?.data?.error || axiosError.response?.data?.err?.message || fallbackError
        setError(serverError)
        toast.error(serverError)
      } else {
        setError(fallbackError)
        toast.error(fallbackError)
      }
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Update task</h1>
            <p className="mt-2 text-sm text-slate-600">Edit your task details here.</p>
          </div>
          <Link to={`/tasks/${id}`} className="text-sm font-semibold text-slate-700 underline">
            Cancel
          </Link>
        </div>

        {error ? <p className="mb-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

        {isLoading ? (
          <p className="text-sm font-medium text-slate-700">Loading task details...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Title</span>
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Description</span>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
                rows={4}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900"
              />
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Priority</span>
                <select
                  value={priority}
                  onChange={(event) => setPriority(event.target.value as 'LOW' | 'MEDIUM' | 'HIGH')}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-slate-700">Status</span>
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value as 'TODO' | 'IN_PROGRESS' | 'DONE')}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900"
                >
                  <option value="TODO">Todo</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DONE">Done</option>
                </select>
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">Due date</span>
              <input
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900"
              />
            </label>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? 'Saving...' : 'Update task'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default UpdateTask
