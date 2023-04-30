-- User tables
CREATE TABLE IF NOT EXISTS Users (
    id TEXT PRIMARY KEY NOT NULL,
    first TEXT NOT NULL,
    last TEXT NOT NULL,
    email TEXT(20) NOT NULL,
    username TEXT(20) UNIQUE NOT NULL,
    passwordHash TEXT(50) NOT NULL UNIQUE
);

-- Event tables
CREATE TABLE IF NOT EXISTS Events (
    eventId TEXT UNIQUE PRIMARY KEY,
    hostId TEXT NOT NULL REFERENCES Ussers(userId),
    eventName TEXT(20) NOT NULL,
    eventDescription TEXT(200),
    eventDate TEXT(20) NOT NULL,
    locationName TEXT(100) NOT NULL,
    latitude INT NOT NULL,
    longitude INT NOT NULL
);

-- Event Image Table
CREATE TABLE IF NOT EXISTS EventImages (
    imageId TEXT UNIQUE PRIMARY KEY,
    parentEventId TEXT NOT NULL REFERENCES Events(eventId),
    imagePath TEXT NOT NULL
);