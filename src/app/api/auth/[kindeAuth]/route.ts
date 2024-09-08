import { NextRequest, NextResponse } from 'next/server';
import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';

export const GET = async (req: NextRequest) => {
  console.log('Callback URL:', req.url);  // Log callback URL

  const url = new URL(req.url);
  const state = url.searchParams.get('state');
  console.log('Received state from callback:', state);  // Log received state

  // Use handleAuth to handle the authentication flow properly
  return handleAuth(req, NextResponse);
};
