import { prisma } from "./index";
import { Album } from "@/types/Album";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function addToCollection(album: Album) {
  try {
    await prisma.album.create({
      data: {
        id: album.id,
        title: album.title,
        artist: album.artist,
        year: album.year,
        coverImageURL: album.coverImageURL,
        format: Array.isArray(album.format)
          ? JSON.stringify(album.format)
          : null,
        isMasterRelease: album.isMasterRelease,
      },
    });
    return true;
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      console.log("Album already exists in collection");
      return false;
    }
    console.error("Error adding to collection:", error);
    return false;
  }
}

export async function removeFromCollection(albumId: number) {
  try {
    await prisma.album.delete({
      where: {
        id: albumId,
      },
    });
    return true;
  } catch (error) {
    console.error("Error removing from collection:", error);
    return false;
  }
}

export async function isInCollection(albumId: number) {
  try {
    const item = await prisma.album.findUnique({
      where: {
        id: albumId,
      },
    });
    return !!item;
  } catch (error) {
    console.error("Error checking collection:", error);
    return false;
  }
}
