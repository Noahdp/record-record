import { Album } from "@/types/Album";

export async function addToCollection(album: Album) {
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
}

export async function getCollection(): Promise<Album[]> {
  const response = await fetch("/api/collection/all");

  if (!response.ok) {
    throw new Error("Failed to fetch collection");
  }

  return response.json();
}

export async function isInCollection(id: number): Promise<boolean> {
  try {
    const response = await fetch(`/api/collection/${id}`);

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.exists;
  } catch {
    return false;
  }
}

export async function removeFromCollection(id: number): Promise<boolean> {
  try {
    const response = await fetch(`/api/collection/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to remove from collection");
    }

    return true;
  } catch {
    throw new Error("Failed to remove from collection");
  }
}
