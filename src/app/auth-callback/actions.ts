'use server'

import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id || !user.email) {
      return res.status(400).json({ error: 'Invalid user data' });
    }

    const existingUser = await db.user.findFirst({
      where: { id: user.id },
    });

    if (!existingUser) {
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
