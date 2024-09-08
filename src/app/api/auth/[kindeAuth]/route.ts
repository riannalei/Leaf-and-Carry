// src/app/api/auth/[kindeAuth]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';

export async function GET(req: NextRequest) {
  try {
    console.log('Callback URL:', req.url);  // Log callback URL for debugging

    // You might need to extract query parameters, but handleAuth should manage it
    const url = new URL(req.url);
    const state = url.searchParams.get('state');
    console.log('Received state from callback:', state);  // Log received state

    // Use handleAuth to handle the authentication flow properly
    const response = await handleAuth(req); // Make sure handleAuth returns a Response

    // Return the response object
    return response;
  } catch (error) {
    console.error('Error during authentication callback:', error); // Improved error logging
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
