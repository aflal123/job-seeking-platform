import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { serializeData } from '@/lib/auth';

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: 'Employer ID is required' }, { status: 400 });
    }

    const jobs = await prisma.job.findMany({
      where: {
        employerId: BigInt(id),
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(serializeData(jobs));
  } catch (error) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
