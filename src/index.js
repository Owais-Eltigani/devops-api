import express from 'express';
import dotenv from 'dotenv';
import logger from './config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors'; 
import router from './routes/auth.route.js';

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use('/logs', express.static('logs'));
app.use(cors());
app.use(cookieParser());
// Load environment variables from .env file
dotenv.config();    
const PORT =  3000;

// Start the server 
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    logger.info('Root endpoint accessed');
    res.send('Hello, DevOps API!');
});

app.get('/health', (req, res) => {
    logger.info('Health check endpoint accessed');
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString(), uptime: process.uptime()  });
});

app.use("/api/auth", router);


export default app;



