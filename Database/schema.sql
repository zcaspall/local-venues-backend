-- User tables
CREATE TABLE IF NOT EXISTS Users (
    id TEXT PRIMARY KEY NOT NULL,
    first TEXT NOT NULL,
    last TEXT NOT NULL,
    email TEXT(20) NOT NULL,
    username TEXT(20) UNIQUE NOT NULL,
    passwordHash TEXT(50) NOT NULL UNIQUE
);