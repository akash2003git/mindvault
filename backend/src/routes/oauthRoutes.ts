import { Router } from "express";
import passport from "passport";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import { UserDocument } from "../models/User";
import "../config/passport";
import { FRONTEND_BASE_URL } from "../config/env";

const router = Router();

const signToken = (user: UserDocument) => {
  return sign(
    { id: user._id, username: user.username, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" },
  );
};

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const user = req.user as UserDocument;
    const token = signToken(user);
    // res.json({ token });
    res.redirect(
      `${FRONTEND_BASE_URL}/auth/success?token=${encodeURIComponent(token)}`,
    );
  },
);

export default router;
