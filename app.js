const express = require('express');
const morgan = require('morgan');
const hospitalRoutes = require('./Routes/hospitalRoutes');
require('dotenv').config();

const app = express();
app.use(morgan('dev'));

// Middleware to parse JSON request bodies
app.use(express.json());

// Use the hospital routes
app.use('/api/hospitals', hospitalRoutes);

// Set the port number
const PORT = process.env.PORT;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});