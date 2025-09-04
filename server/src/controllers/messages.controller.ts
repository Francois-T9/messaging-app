import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

const createMessage = async (req: Request, res: Response) => {
  try {
    const { content } = req.body; // Make sure client sends
    const { userId, receiverId } = req.params; // comes from the URL

    // userId

    const newMessage = await prisma.message.create({
      data: {
        content,
        senderId: Number(userId), // required field
        receiverId: Number(receiverId), // required field
      },
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create message" });
  }
};

const receivedMessages = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const messages = await prisma.message.findMany({
      where: {
        receiverId: Number(userId),
      },
    });
    res.status(201).json(messages);
  } catch (error) {
    console.log(error);
  }
};

export default { createMessage, receivedMessages };
