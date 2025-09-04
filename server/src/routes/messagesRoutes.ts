import { Router } from "express";
import messagesController from "../controllers/messages.controller";
import passport from "passport";
const router = Router({ mergeParams: true });

router.post(
  "/messages/:userId/:receiverId",
  passport.authenticate("jwt", { session: false }),
  messagesController.createMessage
);
router.get(
  "/messages/:userId",
  passport.authenticate("jwt", { session: false }),
  messagesController.receivedMessages
);
export default router;
