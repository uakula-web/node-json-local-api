// 1. Import core backend modules
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(express.json());

// 2. Establish a dynamic GET route endpoint to read data from database.json
app.get('/api/users', (req, res) => {
    const databasePath = path.join(__dirname, 'database.json');
    
    // Read the local JSON file system dynamically
    fs.readFile(databasePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read database file" });
        }
        // Convert raw string text back into interactive JSON data arrays
        const users = JSON.parse(data);
        res.json(users);
    });
});

// 3. Fallback root route endpoint check
app.get('/', (req, res) => {
    res.send("🚀 Node.js JSON Local API Server is humming along beautifully!");
});

// 4. Turn the engine live
app.listen(PORT, () => {
    console.log(`===================================================`);
    console.log(`✅ SUCCESS: Node.js JSON API Server is live!`);
    console.log(`📡 Fetch records at: http://localhost:${PORT}/api/users`);
    console.log(`===================================================`);
});