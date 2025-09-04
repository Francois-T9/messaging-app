const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
// ############## Authentification function ##########

const autheticateToken = function (req, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export default autheticateToken;
