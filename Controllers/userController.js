"use strict";
const userModel = require("../Models/userModels");
const argon2 = require("argon2");

async function createNewUser(req, res) {
    const {first, last, username, email, password} = req.body;

    try {
        await userModel.createUser(first, last, username, email, password);
        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

async function loginUser(req, res) {
    const {username, password} = req.body;
    const user = userModel.getUserByUsername(username);

    if (!user) {
        return res.sendStatus(400);
    }


    const {passwordHash, id} = user;

    try {
        if (await argon2.verify(passwordHash, password)) {
            req.session.regenerate((err) => {
                if (err) {
                    console.error(err);
                    return res.sendStatus(500);
                }

                req.session.user = {};
                req.session.user.userName = username;
                req.session.user.userId = id;
                req.session.isLoggedIn = true;

                return res.sendStatus(200);
            });
        } else {
            return res.sendStatus(400);
        }
    } catch (err) {
        console.error(err);
    }
}

function getSession(req, res) {
    return res.send(req.session);
}

module.exports = {
    createNewUser,
    loginUser,
    getSession
}