import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { serializeData } from '@/lib/auth';

export async function GET() {
  try {
    const [totalUsers, totalJobs, totalCourses, totalApplications] = await Promise.all([
      prisma.user.count(),
      prisma.job.count(),
      prisma.course.count(),
      prisma.jobApplication.count(),
    ]);

    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, fullName: true, email: true, role: true, createdAt: true },
    });

    const recentJobs = await prisma.job.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(
      serializeData({
        stats: {
          totalUsers,
          totalJobs,
          totalCourses,
          totalApplications,
          systemHealth: 'Optimal',
          uptime: '99.98%',
        },
        recentUsers,
        recentJobs,
      })
    );
  } catch (error) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
