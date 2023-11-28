import { Router } from "express";
import * as controller from "../controllers/repo";

const router = Router();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.post("/:id/like", controller.likeById);
router
  .route("/:id")
  .get(controller.getById)
  .put(controller.updateById)
  .delete(controller.deleteById);

export { router as RepoRoutes };
