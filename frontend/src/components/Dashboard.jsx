import { useState, useEffect } from 'react'
import axios from 'axios'
import WorkoutForm from './WorkoutForm'
import ActivityTable from './ActivityTable'

function Dashboard({ user, onLogout }) {
  const [workouts, setWorkouts] = useState([])
  const [comparison, setComparison] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWorkouts()
    fetchComparison()
  }, [])

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get('/workouts')
      setWorkouts(response.data)
    } catch (error) {
      console.error('Error fetching workouts:', error)
    }
  }

  const fetchComparison = async () => {
    try {
      const response = await axios.get('/workouts/comparison')
      setComparison(response.data)
    } catch (error) {
      console.error('Error fetching comparison:', error)
    } finally {
      setLoading(false)
    }
  }

  const addWorkout = async (workoutData) => {
    try {
      const response = await axios.post(`/workouts/${workoutData.type}`, workoutData)
      setWorkouts([response.data, ...workouts])
      fetchComparison()
    } catch (error) {
      console.error('Error adding workout:', error)
    }
  }

  const updateWorkout = async (id, workoutData) => {
    try {
      const response = await axios.put(`/workouts/${id}`, workoutData)
      setWorkouts(workouts.map(w => w.id === id ? response.data : w))
      fetchComparison()
    } catch (error) {
      console.error('Error updating workout:', error)
    }
  }

  const deleteWorkout = async (id) => {
    try {
      await axios.delete(`/workouts/${id}`)
      setWorkouts(workouts.filter(w => w.id !== id))
      fetchComparison()
    } catch (error) {
      console.error('Error deleting workout:', error)
    }
  }

  if (loading) {
    return <div className="loading">Loading dashboard...</div>
  }

  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Project Ember Dashboard</h1>
        <button onClick={onLogout} className="btn btn-secondary">Logout</button>
      </header>

      <div className="card">
        <h2>Welcome, {user.name}!</h2>
        <p>Weight: {user.weight} kg | Age: {user.age} | Gender: {user.gender}</p>
      </div>

      {comparison && (
        <div className="card">
          <h2>This Week's Summary</h2>
          <p>Total Calories Burned: {comparison.total_calories}</p>
          <h3>Calories per Minute Comparison</h3>
          <div className="bar-chart">
            <div
              className="bar running"
              style={{ height: `${Math.max(comparison.running_cal_per_min * 10, 20)}px` }}
            >
              Running: {comparison.running_cal_per_min}
            </div>
            <div
              className="bar gym"
              style={{ height: `${Math.max(comparison.gym_cal_per_min * 10, 20)}px` }}
            >
              Gym: {comparison.gym_cal_per_min}
            </div>
          </div>
        </div>
      )}

      <WorkoutForm onAdd={addWorkout} />

      <ActivityTable
        workouts={workouts}
        onUpdate={updateWorkout}
        onDelete={deleteWorkout}
      />
    </div>
  )
}

export default Dashboard