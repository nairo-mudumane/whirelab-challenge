import { Request, Response } from "express";
import { z as zod } from "zod";
import { IUpdateRepo } from "../../@types";
import database from "../../services/database";

export async function updateById(request: Request, response: Response) {
  const { id } = request.params as { id: string };
  const payload = request.body as IUpdateRepo;
  const { url, title, techs } = payload;

  try {
    const zodSchema = zod.object({
      title: zod.string().nullish(),
      url: zod.string().url({ message: "invalid url" }).nullish(),
      techs: zod.string().array().nullish(),
    });
    zodSchema.parse({ url, title, techs });

    const exists = await database.repo.findFirst({ where: { id } });
    if (!exists) throw new Error("repository not found");
  } catch (error) {
    return response
      .status(400)
      .json({ message: (Error as unknown as Error).message });
  }

  try {
    await database.repo.update({ where: { id }, data: { title, url, techs } });

    return response.status(201).json({ message: "updated" });
  } catch (error) {
    return response
      .status(500)
      .json({ message: (Error as unknown as Error).message });
  }
}
