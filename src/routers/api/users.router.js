import { Router } from "express";
import passport from "passport";
import { UserManager } from "../../data/mongo/manager.mongo.js";
import propsUser from "../../middlewares/propsUser.js";

const router = Router();

router.post("/register", propsUser, async (req, res, next) => {
    try {
        await UserManager.create(req.body);
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(`Error creating user: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/auth/login",
        failureFlash: true,
    })
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

export default router;
