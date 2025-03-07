const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/todos', todoRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todoapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});