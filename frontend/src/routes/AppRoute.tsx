import { Route, Routes } from 'react-router-dom'
import CreateTask from '../pages/CreateTask'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import TaskPage from '../pages/Task'
import Tasks from '../pages/Tasks'
import UpdateTask from '../pages/UpdateTask'
import Verify from '../pages/Verify'

const AppRoute = () => {
  const token = localStorage.getItem('token')
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/create-task" element={token ? <CreateTask /> : <Login />} />
      <Route path="/tasks" element={token ? <Tasks /> : <Login />} />
      <Route path="/tasks/:id" element={token ? <TaskPage /> : <Login />} />
      <Route path="/update-task/:id" element={token ? <UpdateTask /> : <Login />} />
    </Routes>
  )
}

export default AppRoute
