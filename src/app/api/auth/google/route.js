import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signToken, serializeData } from '@/lib/auth';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, fullName, googleId, avatarUrl, role } = body;

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      let formattedRole = 'JOB_SEEKER';
      if (role === 'EMPLOYER') formattedRole = 'EMPLOYER';
      else if (role === 'TRAINER') formattedRole = 'TRAINER';
      else if (role === 'ADMIN') formattedRole = 'ADMIN';
      else formattedRole = 'JOB_SEEKER';

      user = await prisma.user.create({
        data: {
          email,
          fullName: fullName || email.split('@')[0],
          googleId: googleId || '',
          avatarUrl: avatarUrl || '',
          role: formattedRole,
          verified: true,
        },
      });
    } else if (avatarUrl && !user.avatarUrl) {
      user = await prisma.user.update({
        where: { email },
        data: { avatarUrl, googleId: googleId || user.googleId },
      });
    }

    const token = signToken({
      userId: user.id.toString(),
      email: user.email,
      role: user.role,
    });

    return NextResponse.json(
      serializeData({
        token,
        userId: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        avatarUrl: user.avatarUrl,
        message: 'Google authentication successful',
      })
    );
  } catch (error) {
    console.error('Google SSO Error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
