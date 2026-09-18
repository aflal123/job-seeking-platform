import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { serializeData } from '@/lib/auth';

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    let status = searchParams.get('status');

    if (!status) {
      try {
        const body = await req.json();
        status = body.status;
      } catch (e) {
        // no body
      }
    }

    if (!status) {
      return NextResponse.json({ message: 'Status is required' }, { status: 400 });
    }

    const updated = await prisma.jobApplication.update({
      where: { id: BigInt(id) },
      data: { status: status.toUpperCase() },
    });

    return NextResponse.json(serializeData(updated));
  } catch (error) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
