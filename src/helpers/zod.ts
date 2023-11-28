import { ZodError } from "zod";

function throwNewZodError(error: ZodError) {
  const { issues } = error;
  const { message, path } = issues[0];
  const errMessage = `${path}: ${message}`;

  throw new Error(errMessage);
}

export default { throwNewZodError };
