import express, { query } from "express";
import { config } from "dotenv";
import requestIp from "request-ip";
import cors from "cors";
import { mysql } from "./config/database.js";
import pkg from "request-ip";

config();
const app = express();
const PORT = process.env.PORT || 3000;
await mysql.connect();

app.use(cors([process.env.APP_BASE_URL]));
app.use(requestIp.mw());

app.get("/", async (request, response) => {
    try {
        const clientIp = request.headers['x-forwarded-for'] || request.clientIp;
        const query = "SELECT name, max_points FROM users;";
        const rank = await mysql.execute(query);
        return response.status(200).json({ rank, clientIp });
    } catch (error) {
        return response.status(500).json({ error });
    }
});

app.get("/start", async (request, response) => {
    try {
        const { name } = request.body;
        if (name) {
            const clientIp = request.headers['x-forwarded-for'] || request.clientIp;
            const query = "INSERT INTO users (name, ip_address) VALUES (?, ?);";
            await mysql.execute(query, [name, clientIp]);
            return response.status(200).json({ message: "Successfully connected!" });
        }
        return response.status(400).json({ message: "Started successfully with name " + name });
    } catch (error) {
        return response.status(500).json({ error });
    }
});

app.post("/log", async (request, response) => {
    try {
        const { name, points } = request.body;
        if (name && points) {
            let query = "UPDATE users SET points = ? WHERE name = ?";
            await mysql.execute(query, [name, clientIp]);
            return response.status(200).json({ message: "Logged your points!" });
        }
        return response.status(404).json({ message: "Please, provide your name and points!" });
    } catch (error) {
        return response.status(500).json({ error });
    }
});

app.listen(PORT, () => {
    console.log("Express server listening on port " + PORT);
});