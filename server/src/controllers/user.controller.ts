import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
const getAllUsers = async (req: Request, res) => {
  try {
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    console.log(allUsers);
    res.status(200).json(allUsers);
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "Unauthozired. Please log in" });
  }
};

const getUserNameById = async (req: Request, res) => {
  const { userId } = req.params;
  try {
    const response = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      select: {
        name: true,
      },
    });
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
};

export default { getAllUsers, getUserNameById };
