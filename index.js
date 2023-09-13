const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;
const userRoutes = require("./Routes/userRoutes");
const projectRoutes = require("./Routes/projectRoutes"); 

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes); 

app.listen(PORT, () => console.log(`Express server is running on port ${PORT}`));
