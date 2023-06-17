import { prisma } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const notes = await prisma.note.findMany();
  return NextResponse.json(notes);
}
