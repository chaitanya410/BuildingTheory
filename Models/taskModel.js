const db = require("../connection");

const Task = {
  tableName: "tasks",
  columns: {
    task_id: "task_id",
    task_name: "task_name",
    project_id: "project_id",
  },
};
module.exports = Task;