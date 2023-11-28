import { Request, Response } from "express";
import database from "../../services/database";

export async function deleteById(request: Request, response: Response) {
  const { id } = request.params as { id: string };

  try {
    const repo = await database.repo.findFirst({ where: { id } });
    if (!repo) return response.status(404).json({ message: "not found" });
    else await database.repo.delete({ where: { id } });

    return response.status(201).json({ message: "updated" });
  } catch (error) {
    return response
      .status(500)
      .json({ message: (Error as unknown as Error).message });
  }
}
