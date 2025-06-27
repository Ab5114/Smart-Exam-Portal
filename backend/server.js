const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

const examRoutes = require("./routes/examRoutes");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/examdb")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/exams",examRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
