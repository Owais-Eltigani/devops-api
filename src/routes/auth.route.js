import express from 'express';
import { signup } from '../controllers/auth.controller.js';

const router = express.Router();

// Sample login route
router.post('/signup', signup);

router.post('/signin', (req, res) => {
res.send('POST /auth/signin endpoint');
});

router.post('/signout', (req, res) => {
res.send('POST /auth/signout endpoint');
});

export default router;  

