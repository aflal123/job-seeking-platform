import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { serializeData } from '@/lib/auth';

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get('jobId');
    const applicantId = searchParams.get('applicantId');

    let body = {};
    try {
      body = await req.json();
    } catch (e) {
      body = {};
    }

    if (!jobId || !applicantId) {
      return NextResponse.json({ message: 'jobId and applicantId required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: BigInt(applicantId) },
    });

    const application = await prisma.jobApplication.create({
      data: {
        jobId: BigInt(jobId),
        applicantId: BigInt(applicantId),
        applicantName: user?.fullName || body.applicantName || 'Applicant',
        applicantEmail: user?.email || body.applicantEmail || '',
        coverLetter: body.coverLetter || '',
        resumeUrl: user?.resumeUrl || body.resumeUrl || '',
        status: 'PENDING',
      },
    });

    return NextResponse.json(serializeData(application), { status: 201 });
  } catch (error) {
    console.error('Apply job error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
