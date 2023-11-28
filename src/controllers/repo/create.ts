import { Request, Response } from "express";
import { INewRepo, UndoPartial } from "../../@types";
import database from "../../services/database";
import helpers from "../../helpers";

export async function create(request: Request, response: Response) {
  const payload = request.body as INewRepo;
  const { url, title, techs } = payload;

  try {
    helpers.repo.create({ url, title, techs });

    const exists = await database.repo.findFirst({ where: { url } });
    if (exists) throw new Error("url already taken");
  } catch (error) {
    return response.status(400).json({ message: (error as Error).message });
  }

  try {
    const repo = await database.repo.create({
      data: { url, title, techs } as UndoPartial<INewRepo>,
    });

    return response.status(201).json({ message: "created", data: repo });
  } catch (error) {
    return response.status(500).json({ message: (error as Error).message });
  }
}
