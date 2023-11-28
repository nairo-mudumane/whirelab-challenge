import { Express } from "express";
import { RepoRoutes } from "./repo";

export default function ServerRouter(server: Express) {
  server.use("/repositories", RepoRoutes);
}
