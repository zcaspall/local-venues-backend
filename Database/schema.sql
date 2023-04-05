-- User tables
CREATE TABLE IF NOT EXISTS Users (
    userId TEXT PRIMARY KEY NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT(20) NOT NULL,
    username TEXT(20) UNIQUE NOT NULL,
    passwordHash TEXT(50) NOT NULL UNIQUE
);