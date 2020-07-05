PRAGMA foreign_keys = ON;

CREATE TABLE Users (
    Username VARCHAR(30) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    Filename VARCHAR(64),
    PasswordHash VARCHAR(256),
    DateCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (Username)
);

CREATE UNIQUE INDEX idx_users_username_passwordHash
ON Users (Username, PasswordHash);