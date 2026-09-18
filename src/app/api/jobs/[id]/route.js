import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { serializeData } from '@/lib/auth';

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const job = await prisma.job.findUnique({
      where: { id: BigInt(id) },
    });

    if (!job) {
      return NextResponse.json({ message: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json(serializeData(job));
  } catch (error) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
