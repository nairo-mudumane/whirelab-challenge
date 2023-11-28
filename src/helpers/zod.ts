import { ZodError } from "zod";

function throwNewZodError(error: ZodError) {
  const { issues } = error;
  const { code, message } = issues[0];
  const errMessage = `ERR_${code.toUpperCase()}: ${message}`;

  throw new Error(errMessage);
}

export default { throwNewZodError };
