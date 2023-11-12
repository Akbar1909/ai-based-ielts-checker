export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.PORT as unknown as string, 10) || 3001,
  jwt: {
    secret: process.env.ACCESS_TOKEN_SECRET,
  },
});
