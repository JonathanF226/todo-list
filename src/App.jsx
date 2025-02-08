import { useState } from 'react'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  /**
   * Updates the task state with the current value types in the input field.
   * 
   * @param {Object} e - The event object generated by the input field.
   * @param {String} e.target.value - The new value typed in the input field. 
   */
  const handleInput = (e) => {
    setTask(e.target.value)
  }

  /**
   * Adds the current task to the list of tasks.
   * 
   * This function first checks if the task is not empty, if empty then nothing is done.
   * If not empty, it updates the tasks by adding the new task to the list.
   * The input field is then cleared to allow the user to add another task.
   * 
   * @returns {void} This function does not return anything.
   */
  const handleAddTask = () => {
    if (task.trim() !== ''){
      setTasks((prevTasks) => [...prevTasks, task])//add to list using callback form
      setTask('')
    }
  }

  return (
    <>
      <h1>Make Today Count!</h1>
      <input
        type='text'
        placeholder='What will you achieve?'
        value={task}
        onChange={handleInput}
      />
      <div className="add-button">
        <button onClick={handleAddTask}>
          Add
        </button>
      </div>

      <div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
