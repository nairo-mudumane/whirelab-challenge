import { Request, Response } from "express";
import { z as zod } from "zod";
import { INewRepo, UndoPartial } from "../../@types";
import database from "../../services/database";

export async function create(request: Request, response: Response) {
  const payload = request.body as INewRepo;
  const { url, title, techs } = payload;

  try {
    const zodSchema = zod.object({
      title: zod.string({ required_error: "title is required" }),
      url: zod
        .string({ required_error: "url is required" })
        .url({ message: "invalid url" }),
      techs: zod.string().array(),
    });
    zodSchema.parse({ url, title, techs });

    const exists = await database.repo.findFirst({ where: { url } });
    if (exists) throw new Error("url already taken");
  } catch (error) {
    return response
      .status(400)
      .json({ message: (Error as unknown as Error).message });
  }

  try {
    const repo = await database.repo.create({
      data: { url, title, techs } as UndoPartial<INewRepo>,
    });

    return response.status(201).json({ message: "created", data: repo });
  } catch (error) {
    return response
      .status(500)
      .json({ message: (Error as unknown as Error).message });
  }
}
