// src/app/api/auth/[kindeAuth]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';

export async function GET(req: NextRequest) {
  try {
    console.log('Callback URL:', req.url);  // Log callback URL for debugging

    // Manually handle the response creation for Next.js App Router
    const res = NextResponse.next(); // Creates an empty response object

    // Correctly pass both req and res to handleAuth
    const result = await handleAuth(req, res); // Call handleAuth with both arguments

    // Return the result directly
    return result;
  } catch (error) {
    console.error('Error during authentication callback:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
