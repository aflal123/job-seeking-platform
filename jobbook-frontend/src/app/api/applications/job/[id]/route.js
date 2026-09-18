import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { serializeData } from '@/lib/auth';

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const applications = await prisma.jobApplication.findMany({
      where: {
        jobId: BigInt(id),
      },
      orderBy: { appliedAt: 'desc' },
    });

    return NextResponse.json(serializeData(applications));
  } catch (error) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
