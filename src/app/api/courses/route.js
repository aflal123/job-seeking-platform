import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { serializeData } from '@/lib/auth';

// GET all courses
export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(serializeData(courses));
  } catch (error) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}

// POST create course
export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const trainerId = searchParams.get('trainerId');
    const body = await req.json();

    const { title, description, level, category, thumbnailUrl, videoUrl, trainerName } = body;

    if (!title) {
      return NextResponse.json({ message: 'Course title is required' }, { status: 400 });
    }

    const course = await prisma.course.create({
      data: {
        title,
        description: description || '',
        level: level || 'Beginner',
        category: category || 'Software Engineering',
        thumbnailUrl: thumbnailUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600',
        videoUrl: videoUrl || '',
        trainerName: trainerName || 'Lead Mentor',
        rating: 4.9,
        enrollmentsCount: 0,
        trainerId: trainerId ? BigInt(trainerId) : null,
      },
    });

    return NextResponse.json(serializeData(course), { status: 201 });
  } catch (error) {
    console.error('Create course error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}
