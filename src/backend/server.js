import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 5001;

// This route fetches all tasks from the database and returns them as a response.
app.get('/tasks', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks');  // Query the database for tasks
        res.json(result.rows);  // Send the tasks as a response
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// This route allows a new task to be added to the database. The task description is passed in the request body.
app.post('/tasks', async (req, res) => {
    const { description } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO tasks (description) VALUES ($1) RETURNING *',
        [description]
      );
      res.status(201).json(result.rows[0]);  // Respond with the newly created task
    } catch (err) {
      console.error('Error adding task:', err);  
      res.status(500).json({ error: err.message });
    }
  })

// This route allows a task to be deleted based on its ID. The ID is passed in the url parameters.
app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
      res.status(204).send();  // No content to send back after successful delete
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// Srarts the server
app.listen(PORT, () => {
    try {
      console.log(`Server running on http://localhost:${PORT}`);
    } catch (err) {
      console.error('Error in server:', err);
    }
});
