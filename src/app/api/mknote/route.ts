import { prisma } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title, content }: { title: string; content: string } =
    await req.json();

  if (!title) {
    return NextResponse.json({
      success: "fail",
      status: "Title cannot be empty",
    });
  }

  if (!content) {
    return NextResponse.json({
      success: "fail",
      status: "Note content cannot be empty",
    });
  }

  await prisma.note.create({
    data: {
      title,
      content,
    },
  });

  return NextResponse.json({
    success: "success",
    status: "Successfully saved note",
  });
}
