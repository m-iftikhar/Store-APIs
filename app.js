require('dotenv').config(); // Load environment variables at the top
require('express-async-errors');
const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const productRouter = require('./routes/products');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

// Middleware
app.use(express.json()); // For parsing JSON requests

// Routes
app.get('/', (req, res) => {
    res.send('<h1>store apis</h1>');
});

app.use('/api/v1/products', productRouter);

// Middleware for handling not found routes and errors
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        // Connect to the database
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error(error);
    }
};

start();
