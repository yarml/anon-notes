import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/server/db";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({
      success: "fail",
      status: "Authentification failed",
    });
  }

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

  const user = await prisma.user.upsert({
    where: {
      email: session.user.email,
    },
    update: {},
    create: {
      email: session.user.email,
    },
  });

  await prisma.privNote.create({
    data: {
      userId: user.id,
      title,
      content,
    },
  });

  return NextResponse.json({
    success: "success",
    status: "Private Note Saved",
  });
}
