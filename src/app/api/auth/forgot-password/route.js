import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found with this email' }, { status: 404 });
    }

    // In a production mailer this sends a code; here we generate and log it
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`[Forgot Password] OTP for ${email}: ${otp}`);

    return NextResponse.json({
      message: 'Password reset OTP sent to your email!',
      email,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
