import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { serializeData } from '@/lib/auth';

export async function POST(req, { params }) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!id || !userId) {
      return NextResponse.json({ message: 'courseId and userId are required' }, { status: 400 });
    }

    const courseId = BigInt(id);
    const studentId = BigInt(userId);

    // Check if already enrolled
    const existing = await prisma.courseEnrollment.findFirst({
      where: { courseId, studentId },
    });

    if (existing) {
      return NextResponse.json(serializeData(existing));
    }

    const enrollment = await prisma.courseEnrollment.create({
      data: {
        courseId,
        studentId,
        progressPercentage: 0,
        completed: false,
      },
    });

    // Increment course enrollmentsCount
    await prisma.course.update({
      where: { id: courseId },
      data: { enrollmentsCount: { increment: 1 } },
    });

    return NextResponse.json(serializeData(enrollment), { status: 201 });
  } catch (error) {
    console.error('Enroll course error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
