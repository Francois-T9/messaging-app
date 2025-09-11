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

router.get(
  "/messages/:senderId/:receiverId",
  passport.authenticate("jwt", { session: false }),
  messagesController.messagesFromSenderToReceiver
);
export default router;
