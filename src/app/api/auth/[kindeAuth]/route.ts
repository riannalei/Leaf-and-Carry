import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
export const GET = handleAuth();