import { useState } from 'react'

function WorkoutForm({ onAdd }) {
  const [type, setType] = useState('running')
  const [formData, setFormData] = useState({
    distance: '',
    duration: '',
    date: new Date().toISOString().split('T')[0],
    exercise_name: ''
  })

  const handleTypeChange = (newType) => {
    setType(newType)
    setFormData({
      ...formData,
      distance: '',
      exercise_name: ''
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const workoutData = {
      ...formData,
      type,
      distance: type === 'running' ? parseFloat(formData.distance) : null,
      duration: parseInt(formData.duration),
      exercise_name: type === 'gym' ? formData.exercise_name : null
    }
    onAdd(workoutData)
    setFormData({
      distance: '',
      duration: '',
      date: new Date().toISOString().split('T')[0],
      exercise_name: ''
    })
  }

  return (
    <div className="card">
      <h2>Add New Workout</h2>
      <div style={{ marginBottom: '20px' }}>
        <button
          className={`btn ${type === 'running' ? '' : 'btn-secondary'}`}
          onClick={() => handleTypeChange('running')}
          style={{ marginRight: '10px' }}
        >
          Running
        </button>
        <button
          className={`btn ${type === 'gym' ? '' : 'btn-secondary'}`}
          onClick={() => handleTypeChange('gym')}
        >
          Gym
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {type === 'running' && (
          <div className="form-group">
            <label>Distance (km)</label>
            <input
              type="number"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
              step="0.01"
              required
            />
          </div>
        )}

        {type === 'gym' && (
          <div className="form-group">
            <label>Exercise Name</label>
            <input
              type="text"
              name="exercise_name"
              value={formData.exercise_name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn">Add Workout</button>
      </form>
    </div>
  )
}

export default WorkoutForm