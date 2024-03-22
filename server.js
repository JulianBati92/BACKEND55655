import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";
import hbs from "express-handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import { CustomRouter } from "./src/routers/api/custom.router.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
    session({
        secret: process.env.SESSION_SECRET || "secret",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_LINK }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 dia
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true });

app.use("/", CustomRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
