const db = require("../connection");
const Task = require("../Models/taskModel");

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const selectQuery = "SELECT * FROM tasks";

    const [rows] = await db.execute(selectQuery);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({
      status: "error",
      message: "Error fetching tasks",
    });
  }
};

// Add a new task
exports.addTask = async (req, res) => {
  try {
    const task = req.body;

    const insertQuery = `
      INSERT INTO tasks (task_id,task_name, project_id)
      VALUES (?, ?,?)
    `;

    const insertValues = [task.task_id,task.task_name, task.project_id];

    await db.execute(insertQuery, insertValues);

    res.status(200).json({
      status: "success",
      message: "Task added successfully",
    });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({
      status: "error",
      message: "Error adding task",
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { task_id } = req.params;
    const updatedTask = req.body;

    const updateQuery = `
      UPDATE tasks
      SET task_name = ?, project_id = ?
      WHERE task_id = ?
    `;

    const updateValues = [updatedTask.task_name, updatedTask.project_id, task_id];

    const [result] = await db.execute(updateQuery, updateValues);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Task not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Task updated successfully",
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({
      status: "error",
      message: "Error updating task",
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { task_id } = req.params;

    const deleteQuery = `
      DELETE FROM tasks
      WHERE task_id = ?
    `;

    const [result] = await db.execute(deleteQuery, [task_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Task not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({
      status: "error",
      message: "Error deleting task",
    });
  }
};
