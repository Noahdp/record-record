import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const album = await prisma.album.findUnique({
      where: { id },
      select: { id: true },
    });

    return NextResponse.json({ exists: !!album });
  } catch (error) {
    console.error("Failed to check collection status:", error);
    return NextResponse.json(
      { error: "Failed to check collection status" },
      { status: 500 }
    );
  }
}
