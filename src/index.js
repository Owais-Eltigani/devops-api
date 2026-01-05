import express from 'express';
import dotenv from 'dotenv';

const app = express();
// Load environment variables from .env file
dotenv.config();    
const PORT =  3000;

// Start the server 
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello, DevOps API!');
});


export default app;



