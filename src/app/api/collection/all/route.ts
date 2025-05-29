import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Album } from "@/types/Album";

export async function POST(request: Request) {
  try {
    const album: Album = await request.json();

    const result = await prisma.album.create({
      data: {
        id: album.id,
        title: album.title,
        artist: album.artist,
        year: album.year,
        coverImageURL: album.coverImageURL,
        format: Array.isArray(album.format)
          ? JSON.stringify(album.format)
          : null,
      },
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Failed to add to collection" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const albums = await prisma.album.findMany();
    return NextResponse.json(albums);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch collection" },
      { status: 500 }
    );
  }
}
