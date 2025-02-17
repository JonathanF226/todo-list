import { useEffect, useState } from 'react'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  // Fetch the existing tasks from the database when the component mounts
  useEffect(() => {
    fetch('http://localhost:5001/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data))  
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  /**
   * Updates the task state with the current value typed in the input field.
   * 
   * @param {Object} e - The event object generated by the input field.
   * @param {String} e.target.value - The new value typed in the input field. 
   */
  const handleInput = (e) => {
    setTask(e.target.value)
  }

  /**
   * Adds the current task to the database.
   * 
   * This function first checks if the task is not empty, if empty then nothing is done.
   * If not empty, it sends a POST request to the backend to store the task in the database.
   * Once the task is added, there is a fetch to get the latest list of tasks from the databse.
   * Then the input field is then cleared to allow the user to add another task.
   * 
   * @returns {void} This function does not return anything.
   */
  const handleAddTask = () => {
    if (task.trim() !== '') {
      fetch('http://localhost:5001/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: task }),
      })
        .then((response) => response.json())
        .then(() => {
          fetch('http://localhost:5001/tasks')
            .then((response) => response.json())
            .then((data) => setTasks(data)) 
            .catch((error) => console.error('Error fetching tasks:', error));
          setTask(''); 
        })
        .catch((error) => console.error('Error adding task:', error));
    }
  }

  /**
   * Deletes a task from the database and updates the task list.
   * 
   * This function sends a DELETE request to the backend to remove the task from the database.
   * Once the task is removed, it updates the list by filtering out the deleted task.
   * 
   * @param {number} id - The unique ID of the task to delete.
   * @returns {void} This function does not return anything.
   */
  const handleDeleteTask = (id) => {
    // Send DELETE request to backend
    fetch(`http://localhost:5001/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));  // Remove task from state
      })
      .catch((error) => console.error('Error deleting task:', error));
  }

  return (
    <>
    <div className='container'>
      <h1>Make Today Count!</h1>
      <div className='input-container'>
        <input
          type='text'
          placeholder='What will you achieve?'
          value={task}
          onChange={handleInput}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <div>
        <ul>
          {tasks.map((task, index) => (
            <li key={task.id}>
              <div className='task-description'>{task.description}</div>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  )
}

export default App
