import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { serializeData } from '@/lib/auth';

// GET all open jobs with optional filters
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const location = searchParams.get('location');
    const jobType = searchParams.get('jobType');

    const whereClause = {
      status: 'OPEN',
    };

    if (location && location.trim() !== '') {
      whereClause.location = {
        contains: location.trim(),
        mode: 'insensitive',
      };
    }

    if (jobType && jobType.trim() !== '') {
      whereClause.jobType = jobType.trim();
    }

    const jobs = await prisma.job.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(serializeData(jobs));
  } catch (error) {
    console.error('Fetch jobs error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}

// POST a new job opening
export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const employerId = searchParams.get('employerId');
    const body = await req.json();

    const { title, description, companyName, location, salaryRange, jobType, requirements } = body;

    if (!title) {
      return NextResponse.json({ message: 'Job title is required' }, { status: 400 });
    }

    const job = await prisma.job.create({
      data: {
        title,
        description: description || '',
        companyName: companyName || 'Company Inc.',
        location: location || 'Remote',
        salaryRange: salaryRange || '$80,000 - $110,000',
        jobType: jobType || 'FULL_TIME',
        status: 'OPEN',
        employerId: employerId ? BigInt(employerId) : null,
        requirements: requirements || '',
      },
    });

    return NextResponse.json(serializeData(job), { status: 201 });
  } catch (error) {
    console.error('Create job error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
