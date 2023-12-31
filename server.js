const express = require("express");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const connectdb = require("./config/db");

connectdb();
process.env.DB_URI
const app = express();
const port = process.env.port || 3000;  

app.use(express.json());
app.use(errorHandler);
app.use("/api/contacts/", require("./routes/contactRoutes")); 
app.use("/api/users/", require("./routes/userRoutes")); 

app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
});

