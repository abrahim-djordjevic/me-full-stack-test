// middleware.ts
import express from "express";
import session from "express-session"

// Augment express-session with a custom SessionData object
declare module "express-session" {
    interface SessionData {
        authenticated: boolean,
        user: string | undefined
    }
}
const CI = process.env.CI;
const server = express().disable("x-powered-by");

module.exports.session;
