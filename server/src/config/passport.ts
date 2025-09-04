import { PrismaClient } from "@prisma/client";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

const prisma = new PrismaClient();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET || "cats", // Must match login
  algorithms: ["HS256"], // Must match login
};

const strategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (user) return done(null, user);
    return done(null, false);
  } catch (err) {
    return done(err, false);
  }
});

module.exports = (passport) => {
  passport.use(strategy);
};
