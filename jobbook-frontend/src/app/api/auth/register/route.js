import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, serializeData } from '@/lib/auth';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, fullName, phone, role } = body;

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName: fullName || email.split('@')[0],
        phone: phone || '',
        role: role || 'JOB_SEEKER',
        verified: true, // Activated by default for streamlined onboarding
      },
    });

    return NextResponse.json(
      serializeData({
        message: 'User registered successfully! Account activated.',
        userId: user.id,
        email: user.email,
        role: user.role,
        requiresVerification: false,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
