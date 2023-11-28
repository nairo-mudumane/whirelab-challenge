import { Request, Response } from "express";
import database from "../../services/database";

export async function getById(request: Request, response: Response) {
  const { id } = request.params as { id: string };

  try {
    const repo = await database.repo.findFirst({ where: { id } });
    if (!repo) return response.status(404).json({ message: "no found" });

    return response.status(200).json({ message: "ok", data: repo });
  } catch (error) {
    return response
      .status(500)
      .json({ message: (Error as unknown as Error).message });
  }
}
