import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { email } = await req.json();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    console.log(`[Next.js Auth] Generated OTP for ${email}: ${otp}`);

    return NextResponse.json({
      message: 'New OTP dispatched to your registered email address!',
      email,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
