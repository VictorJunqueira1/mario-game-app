CREATE DATABASE db_mario_game;
USE db_mario_game;

CREATE TABLE users (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `ip_address` VARCHAR(255) NOT NULL,
    `max_points` INT NULL
)