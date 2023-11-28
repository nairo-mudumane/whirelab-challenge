import { Request, Response } from "express";
import database from "../../services/database";

export async function likeById(request: Request, response: Response) {
  const { id } = request.params as { id: string };

  try {
    const repo = await database.repo.findFirst({ where: { id } });
    if (!repo) return response.status(404).json({ message: "no found" });

    await database.repo.update({
      where: { id },
      data: { likes: repo.likes + 1 },
    });

    return response.status(200).json({ message: "ok" });
  } catch (error) {
    return response
      .status(500)
      .json({ message: (Error as unknown as Error).message });
  }
}
