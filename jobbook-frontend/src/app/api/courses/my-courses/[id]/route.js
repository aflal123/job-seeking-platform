import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { serializeData } from '@/lib/auth';

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const enrollments = await prisma.courseEnrollment.findMany({
      where: {
        studentId: BigInt(id),
      },
      orderBy: { enrolledAt: 'desc' },
    });

    // Get the course details for each enrollment
    const courseIds = enrollments.map((e) => e.courseId).filter(Boolean);
    const courses = await prisma.course.findMany({
      where: {
        id: { in: courseIds },
      },
    });

    const enriched = enrollments.map((enrollment) => {
      const course = courses.find((c) => c.id === enrollment.courseId);
      return {
        ...enrollment,
        course,
      };
    });

    return NextResponse.json(serializeData(enriched));
  } catch (error) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
