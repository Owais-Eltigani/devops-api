import express from 'express';
import dotenv from 'dotenv';
const app = express();
// Middleware to parse JSON requests
app.use(express.json());

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 3000;



// Sample route
app.get('/', (req, res) => {
    res.send('Hello, DevOps API!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });