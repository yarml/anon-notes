import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/server/db";
import { title } from "process";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ status: "fail" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email!,
    },
  });

  if (!user) {
    return NextResponse.json({ status: "success", notes: [] });
  }

  const notes = await prisma.privNote.findMany({
    where: {
      userId: user?.id,
    },
  });

  return NextResponse.json({
    status: "success",
    notes: notes.map((note) => {
      return {
        id: note.id,
        title: note.title,
        content: note.content,
      };
    }),
  });
}
