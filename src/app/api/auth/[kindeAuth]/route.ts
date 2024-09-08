import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';

export const GET = async (req, res) => {
  console.log('Callback URL:', req.url);  // Log callback URL
  console.log('Received state from callback:', req.query.state);  // Log received state
  
  return handleAuth()(req, res);  // Continue with the default handler
};