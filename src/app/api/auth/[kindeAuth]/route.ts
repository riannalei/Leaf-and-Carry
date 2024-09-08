// src/app/api/auth/[kindeAuth]/route.ts

import { NextRequest } from 'next/server';
import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';

export async function GET(req: NextRequest) {
  try {
    console.log('Callback URL:', req.url);  // Log callback URL for debugging

    // Correctly handle the authentication flow with Kinde's SDK
    return await handleAuth()(req); // Return a Response object
  } catch (error) {
    console.error('Error during authentication callback:', error); // Improved error logging
    return new Response('Internal Server Error', { status: 500 });
  }
}
