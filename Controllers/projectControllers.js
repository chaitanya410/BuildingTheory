const projectModel = require("../Models/projectModel");
const db = require("../connection");

exports.addProject = async (req, res) => {
  try {
    const project = req.body;

    const insertQuery = "INSERT INTO projects (project_id,project_name,user_id) VALUES (?,?,?)";
    const insertValues = [project.project_id,project.project_name,project.user_id];

    await db.execute(insertQuery, insertValues);

    res.status(201).json({
      status: "success",
      message: "Project added successfully",
    });
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({
      status: "error",
      message: "Error adding project",
    });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const selectQuery = "SELECT * FROM projects";
    
    const [rows] = await db.execute(selectQuery);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      status: "error",
      message: "Error fetching projects",
    });
  }
};



exports.updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { newName } = req.body;

  
    const updateQuery = "UPDATE projects SET project_name = ? WHERE project_id = ?";
    
    
    await db.execute(updateQuery, [newName, projectId]);

    res.status(200).json({
      status: "success",
      message: "Project updated successfully",
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({
      status: "error",
      message: "Error updating project",
    });
  }
};









