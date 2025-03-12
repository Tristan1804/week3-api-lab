const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json()); 

const AUTH_TOKEN = "securetoken123";

app.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    res.status(201).json({ message: "User registered successfully" });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    res.status(200).json({ token: AUTH_TOKEN });
});

app.get('/api/protected', (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader !== `Bearer ${AUTH_TOKEN}`) {
        return res.status(403).json({ message: "Forbidden: Invalid or missing token" });
    }

    res.status(200).json({ message: "Protected data accessed" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
});