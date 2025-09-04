import { body } from "express-validator";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const validateUser = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .custom(async (value) => {
      const existingUser = await prisma.user.findUnique({
        where: { name: value },
      });
      if (existingUser) {
        throw new Error("Username is already in use");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export default validateUser;
