import { z as zod } from "zod";
import zodHelper from "./zod";
import { INewRepo, IUpdateRepo } from "../@types";

const create = (data: INewRepo) => {
  try {
    zod
      .object({
        title: zod.string({ required_error: "title is required" }),
        url: zod
          .string({ required_error: "url is required" })
          .url({ message: "invalid url" }),
        techs: zod.string().array(),
      })
      .parse(data);
  } catch (error) {
    zodHelper.throwNewZodError(error as zod.ZodError);
  }
};

const updateById = (data: IUpdateRepo) => {
  try {
    zod
      .object({
        title: zod.string().nullish(),
        url: zod.string().url({ message: "invalid url" }).nullish(),
        techs: zod.string().array().nullish(),
      })
      .parse(data);
  } catch (error) {
    zodHelper.throwNewZodError(error as zod.ZodError);
  }
};

export default { create, updateById };
