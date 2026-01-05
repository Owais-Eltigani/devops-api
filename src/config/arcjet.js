import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";

// const app = express();
// const port = 3000;

const aj = arcjet({
  // Get your site key from https://app.arcjet.com and set it as an environment
  // variable rather than hard coding.
  key: process.env.ARCJET_API_KEY,
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),
    // Create a bot detection rule
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services
        "CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      ],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
slidingWindow({
      mode: "LIVE", // Enforce the rate limit. Use "DRY_RUN" to log only
      limit: 100, // Max 100 requests
      window: 60, // Per 60 seconds
      max: 200, // Allow some bursts
      interval: 10, // Check every 10 seconds
      // Optionally customize the response when rate limited
      // response: {
      //   statusCode: 429,
      //   body: JSON.stringify({ error: "Too Many Requests" }),
      //   headers: { "Retry-After": "60" },
      // },
    }), 
  ],
});

export default aj;