import express from "express";
import authControllers from "../controllers/auth.controller";
import validateUser from "../middlewares/validation.middleware";
import autheticateToken from "../middlewares/auth.middleware";
const router = express.Router({ mergeParams: true });

router.post("/login", authControllers.login);
router.post("/signup", validateUser, authControllers.signup);
router.post("/logout", autheticateToken, authControllers.logout);

export default router;
