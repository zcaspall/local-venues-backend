"use strict";
const db = require("./db");
const crypto = require("crypto");
const argon2 = require("argon2");
const { env } = require("process");

async function createUser(first, last, username, email, password) {
    const uuid = crypto.randomUUID();
    const hash = await argon2.hash(password);

    const sql = `
        INSERT INTO Users
            (id, first, last, email, username, passwordHash)
        VALUES
            (@id, @first, @last, @email, @username, @password)
    `;

    const stmt = db.prepare(sql);

    try{
        stmt.run({
            id: uuid,
            first,
            last,
            email,
            username,
            password: hash
        });
    }
    catch(err){
        console.error(err);
    }
};

function getUserByUsername(username) {
    const sql = `SELECT * FROM Users WHERE username = @username`;

    const stmt = db.prepare(sql);

    try {
        stmt.get({
            username,
        });
    } catch(err){
        console.error(err);
    }

    return stmt
}

module.exports = {
    createUser,
    getUserByUsername
}