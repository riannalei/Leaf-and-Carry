// Import necessary types from Next.js
import type { NextApiRequest, NextApiResponse } from 'next';
import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('Callback URL:', req.url);  // Log callback URL
  console.log('Received state from callback:', req.query.state);  // Log received state
  
  // Continue with the default Kinde auth handler
  return handleAuth()(req, res);
};
