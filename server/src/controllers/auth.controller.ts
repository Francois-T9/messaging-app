import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import e from "express";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const login = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  console.log(name, password);

  const user = await prisma.user.findUnique({
    where: { name: name },
  });

  if (!user) {
    return res.status(401).json({ error: "Username not found" });
  } else {
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });
  }
  const payload = {
    sub: user.id,
    name: user.name,
  };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_EXPIRES_IN,
  });
  await prisma.user.update({
    where: { name },
    data: { refreshToken },
  });

  // return responses with user info

  res.json({ userId: user.id, name: user.name, accessToken });
};

const signup = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ error: errors.array()[0].msg });
  }
  const { name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(name, password);

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
      },
    });
    console.log(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error });
  }
};

const logout = async (req, res: Response) => {
  const userId = req.user.sub;
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(401).json({ message: "Logout error" });
    console.log(err);
  }
};
export default { login, signup, logout };
