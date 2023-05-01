"use strict";
require("dotenv").config();
const isProduction = process.env.NODE_ENV === "production";

const redis = require("redis");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const express = require("express");
const app = express();

const redisClient = redis.createClient({
    legacyMode: true
});

redisClient.connect()

const sessionConfig = {
    store: new RedisStore({ client: redisClient }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    name: "session",
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 8,
    }
};

app.use(session(sessionConfig));

const { func } = require("joi");
const { notFoundHandler, productionErrorHandler, catchAsyncErrors } = require("./utils/errorHandler");

app.use(express.json({limit: '200kb'}));
app.use(express.urlencoded({ extended: false }));
// app.use(express.static("public", {
//     index: "index.html",
//     extensions: ['html', 'js', 'css', 'png', 'jpg', 'jpeg']
// }));

const userController = require("./Controllers/userController");

app.get("/", (req, res) => {
    res.send("helllppp");
})

// user endpoints
app.post("/register", userController.createNewUser);
app.post("/login", userController.loginUser);
app.get("/user/session", userController.getSession);

// 404 Handler
app.use(notFoundHandler);

// Production error handler
if (isProduction) {
    app.use(productionErrorHandler);
}

module.exports = app;