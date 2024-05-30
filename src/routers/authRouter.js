import { Router } from "express";
import passport from "passport";
import propsUser from "../middlewares/propsUser.js";
import { registerUser } from '../controllers/userController.js'; 

const router = Router();

router.post("/register", propsUser, registerUser);

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/auth/login",
        failureFlash: true,
    })
);

// Google authentication routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/auth/login" }),
    (req, res) => {
        res.redirect("/");
    }
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

export default router;
