import { Request, Response } from "express";
import database from "../../services/database";

export async function getAll(request: Request, response: Response) {
  try {
    const repos = await database.repo.findMany();

    return response.status(200).json({ message: "ok", data: repos });
  } catch (error) {
    return response.status(500).json({ message: (error as Error).message });
  }
}
