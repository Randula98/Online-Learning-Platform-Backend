import session from "express-session";
import dotenv from "dotenv/config";

export const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 4,
        sameSite: "none",
        secure: true,
    },
})