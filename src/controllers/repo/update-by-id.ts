import { Request, Response } from "express";
import { IUpdateRepo } from "../../@types";
import database from "../../services/database";
import helpers from "../../helpers";

export async function updateById(request: Request, response: Response) {
  const { id } = request.params as { id: string };
  const payload = request.body as IUpdateRepo;
  const { url, title, techs } = payload;

  try {
    helpers.repo.create({ url, title, techs });
    ({ url, title, techs });

    const exists = await database.repo.findFirst({ where: { id } });
    if (!exists) throw new Error("repository not found");
  } catch (error) {
    return response.status(400).json({ message: (error as Error).message });
  }

  try {
    await database.repo.update({ where: { id }, data: { title, url, techs } });

    return response.status(201).json({ message: "updated" });
  } catch (error) {
    return response.status(500).json({ message: (error as Error).message });
  }
}
