import userController from "../controllers/user.controller";
import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController.getAllUsers
);

router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  userController.getUserNameById
);
export default router;
