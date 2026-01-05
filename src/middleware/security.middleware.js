import aj from "../config/arcjet.js";
import logger from "../config/logger.js";
import { slidingWindow } from "@arcjet/node";

export const securityMiddleware = async (req, res, next) => {


    try {
        const role = req.user?.role || 'guest';

        let limit;
        let message;

        switch (role) {
            case 'admin':
                limit = 1000;
                message = 'Admin rate limit exceeded';
                break;
            case 'user':
                limit = 100;
                message = 'User rate limit exceeded';
                break;
            default:
                limit = 10;
                message = 'Guest rate limit exceeded';
        }

        const client = aj.withRule(slidingWindow({
            interval: 60, // 60 seconds
            max: limit,
            mode: 'LIVE',
            name: `Rate Limit for ${role}`,
            
        }));

        const decision = await client.protect(req);

        if (decision.isDenied && decision.reason.isBot) {
            logger.warn('Request blocked due to bot detection:', { ip: req.ip , userAgent: req.get('User-Agent') });
            return res.status(403).json({ error: 'Access denied', message: 'Bot traffic is not allowed' }); 
        } 
        if (decision.isDenied && decision.reason.isRateLimit) {
            logger.warn('Request blocked due to rate limit:', { ip: req.ip , userAgent: req.get('User-Agent') });
            return res.status(403).json({ error: 'Access denied', message: message }); 
        } 

        if (decision.isDenied && decision.reason.isShield) {
            logger.warn('Request blocked due to shield detection:', { ip: req.ip , userAgent: req.get('User-Agent') , path: req.path , method: req.method });
            return res.status(403).json({ error: 'Access denied', message: 'Malicious activity detected' }); 
        } 

        //? clear to pass through
        next();
    } catch (error) {
        logger.error('Error in security middleware:', error);
        next(error);

    }
}