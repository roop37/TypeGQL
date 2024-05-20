import { Request, Response } from "express";
import { User } from "../schema/user.schema";


// We are defining a type for the Context so that we can easily authorize it
interface Context {
  req: Request;
  res: Response;
  user: User | null;
}

export default Context;
