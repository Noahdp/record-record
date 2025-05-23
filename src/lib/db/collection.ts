import { Album } from "@/types/Album";

export async function addToCollection(album: Album) {
  try {
    const response = await fetch("/api/collection/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(album),
    });

    if (!response.ok) {
      throw new Error("Failed to add to collection");
    }

    return true;
  } catch (error) {
    console.error("Failed to add to collection:", error);
    throw new Error("Failed to add to collection");
  }
}

export async function getCollection(): Promise<Album[]> {
  try {
    const response = await fetch("/api/collection/all");

    if (!response.ok) {
      throw new Error("Failed to fetch collection");
    }

    return response.json();
  } catch (error) {
    console.error("Failed to fetch collection:", error);
    throw new Error("Failed to fetch collection");
  }
}

export async function isInCollection(id: number): Promise<boolean> {
  try {
    const response = await fetch(`/api/collection/${id}`);

    if (!response.ok) {
      throw new Error("Failed to check collection status");
    }

    const data = await response.json();
    return data.exists;
  } catch (error) {
    console.error("Failed to check collection status:", error);
    return false;
  }
}
