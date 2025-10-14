export const jwtConstants = {
  secret: process.env.SECRET_KEY, // Replace with your own secret key
  signOptions: { expiresIn: '1h' }, // Token expiration time
};