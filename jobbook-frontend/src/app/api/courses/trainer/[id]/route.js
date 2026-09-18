import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { serializeData } from '@/lib/auth';

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const courses = await prisma.course.findMany({
      where: {
        trainerId: BigInt(id),
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(serializeData(courses));
  } catch (error) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
