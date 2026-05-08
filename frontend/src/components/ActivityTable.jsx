import { useState } from 'react'

function ActivityTable({ workouts, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})

  const handleEdit = (workout) => {
    setEditingId(workout.id)
    setEditForm({
      distance: workout.distance || '',
      duration: workout.duration,
      date: workout.date,
      exercise_name: workout.exercise_name || ''
    })
  }

  const handleSave = () => {
    onUpdate(editingId, editForm)
    setEditingId(null)
  }

  const handleCancel = () => {
    setEditingId(null)
  }

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="card">
      <h2>Recent Activities</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Details</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Calories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map(workout => (
            <tr key={workout.id}>
              <td>{workout.type}</td>
              <td>
                {editingId === workout.id ? (
                  workout.type === 'running' ? (
                    <input
                      type="number"
                      name="distance"
                      value={editForm.distance}
                      onChange={handleChange}
                      step="0.01"
                      style={{ width: '80px' }}
                    />
                  ) : (
                    <input
                      type="text"
                      name="exercise_name"
                      value={editForm.exercise_name}
                      onChange={handleChange}
                      style={{ width: '120px' }}
                    />
                  )
                ) : (
                  workout.type === 'running' ? `${workout.distance} km` : workout.exercise_name
                )}
              </td>
              <td>
                {editingId === workout.id ? (
                  <input
                    type="number"
                    name="duration"
                    value={editForm.duration}
                    onChange={handleChange}
                    style={{ width: '60px' }}
                  />
                ) : (
                  `${workout.duration} min`
                )}
              </td>
              <td>
                {editingId === workout.id ? (
                  <input
                    type="date"
                    name="date"
                    value={editForm.date}
                    onChange={handleChange}
                  />
                ) : (
                  workout.date
                )}
              </td>
              <td>{workout.calories}</td>
              <td>
                {editingId === workout.id ? (
                  <>
                    <button onClick={handleSave} className="btn" style={{ marginRight: '5px' }}>Save</button>
                    <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(workout)} className="btn" style={{ marginRight: '5px' }}>Edit</button>
                    <button onClick={() => onDelete(workout.id)} className="btn btn-secondary">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ActivityTable