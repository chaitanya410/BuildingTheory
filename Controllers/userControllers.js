const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../connection");

// user registration
exports.registerUsers = async (req, res) => {
  try {
    const user = req.body;
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Construct the SQL query to insert a new user
    const insertQuery = `
      INSERT INTO users (fullName, email, mobileNumber, designation, password, address,user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const insertValues = [
      user.fullName,
      user.email,
      user.mobileNumber,
      user.designation,
      hashedPassword,
      user.address,
      user.user_id
    ];
    await db.execute(insertQuery, insertValues);

    res.status(200).json({
      status: "success",
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      status: "error",
      message: "Error registering user",
    });
  }
};



// Log in an existing user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const user = rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { email: user.email },
      "your-secret-key", // Replace with your own secret key
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: "success",
      jwtToken: token,
      message: "User logged in successfully",
      data: {
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({
      status: "error",
      message: "Error logging in user",
    });
  }
};


//fetch all users
exports.getUsers = async (req, res) => {
  try {
    // Construct the SQL query to get all users
    const selectQuery = "SELECT * FROM users";

    // Execute the select query
    const [rows] = await db.execute(selectQuery);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      status: "error",
      message: "Error fetching users",
    });
  }
};



// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const updatedUser = req.body;

    // Construct the SQL query to update the user
    const updateQuery = `
      UPDATE users
      SET fullName = ?, email = ?, mobileNumber = ?, designation = ?, address = ?
      WHERE user_id = ?
    `;

    const updateValues = [
      updatedUser.fullName,
      updatedUser.email,
      updatedUser.mobileNumber,
      updatedUser.designation,
      updatedUser.address,
      user_id
    ];

    // Execute the update query
    const [result] = await db.execute(updateQuery, updateValues);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      status: "error",
      message: "Error updating user",
    });
  }
};


 
// delete functionality
exports.deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Construct the SQL query to delete the user
    const deleteQuery = `
      DELETE FROM users
      WHERE user_id = ?
    `;

    // Execute the delete query
    const [result] = await db.execute(deleteQuery, [user_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      status: "error",
      message: "Error deleting user",
    });
  }
};





