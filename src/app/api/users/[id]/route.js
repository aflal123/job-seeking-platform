import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { serializeData } from '@/lib/auth';

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { id: BigInt(id) },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        phone: true,
        bio: true,
        avatarUrl: true,
        resumeUrl: true,
        verified: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(serializeData(user));
  } catch (error) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();

    const { fullName, phone, bio, avatarUrl, resumeUrl, role, verified } = body;

    const updated = await prisma.user.update({
      where: { id: BigInt(id) },
      data: {
        ...(fullName !== undefined && { fullName }),
        ...(phone !== undefined && { phone }),
        ...(bio !== undefined && { bio }),
        ...(avatarUrl !== undefined && { avatarUrl }),
        ...(resumeUrl !== undefined && { resumeUrl }),
        ...(role !== undefined && { role }),
        ...(verified !== undefined && { verified }),
      },
    });

    return NextResponse.json(serializeData(updated));
  } catch (error) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
