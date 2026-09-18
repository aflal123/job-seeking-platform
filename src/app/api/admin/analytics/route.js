import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { serializeData } from '@/lib/auth';

export async function GET() {
  try {
    const [
      totalUsers,
      totalJobs,
      totalCourses,
      totalApplications,
      jobSeekersCount,
      employersCount,
      trainersCount,
      adminsCount,
      users,
      recentJobs,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.job.count(),
      prisma.course.count(),
      prisma.jobApplication.count(),
      prisma.user.count({ where: { role: 'JOB_SEEKER' } }),
      prisma.user.count({ where: { role: 'EMPLOYER' } }),
      prisma.user.count({ where: { role: 'TRAINER' } }),
      prisma.user.count({ where: { role: 'ADMIN' } }),
      prisma.user.findMany({
        take: 100,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          fullName: true,
          email: true,
          role: true,
          phone: true,
          verified: true,
          createdAt: true,
        },
      }),
      prisma.job.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return NextResponse.json(
      serializeData({
        stats: {
          totalUsers,
          totalJobs,
          totalCourses,
          totalApplications,
          jobSeekersCount,
          employersCount,
          trainersCount,
          adminsCount,
          systemHealth: 'Optimal',
          uptime: '99.98%',
        },
        users,
        recentJobs,
      })
    );
  } catch (error) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}

