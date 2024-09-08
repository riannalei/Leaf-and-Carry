// Import necessary modules from Next.js and Kinde SDK
import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';
import type { NextRequest } from 'next/server';

// Define the GET handler with the correct type for Next.js App Router
export const GET = async (req: NextRequest) => {
  console.log('Callback URL:', req.url);  // Log callback URL

  const url = new URL(req.url);
  const state = url.searchParams.get('state');
  console.log('Received state from callback:', state);  // Log received state

  // Return the default Kinde auth handler, adjusted for use with `NextRequest`
  return handleAuth()(req);
};
