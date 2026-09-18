import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signToken, serializeData } from '@/lib/auth';

export async function POST(req) {
  try {
    const { email, otp } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Mark as verified
    await prisma.user.update({
      where: { email },
      data: { verified: true },
    });

    const token = signToken({
      userId: user.id.toString(),
      email: user.email,
      role: user.role,
    });

    return NextResponse.json(
      serializeData({
        message: 'Account verified successfully!',
        token,
        userId: user.id,
        role: user.role,
        fullName: user.fullName,
      })
    );
  } catch (error) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
