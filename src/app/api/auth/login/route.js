import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { comparePassword, signToken, serializeData } from '@/lib/auth';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    if (user.password) {
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
      }
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
        fullName: user.fullName || user.email.split('@')[0],
        role: user.role || 'JOB_SEEKER',
        message: 'Login successful',
      })
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
