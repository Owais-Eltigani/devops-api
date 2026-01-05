import 'dotenv/config';


export default {
   schema: './src/models/*.js',
  out: './drizzle',
  dialect: 'postgresql',
    dbCredentials: {
        connectionString: process.env.NEON_DB,
        url: process.env.NEON_DB,
    },
};
