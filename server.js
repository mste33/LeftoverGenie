const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// File paths
const USERS_FILE = path.join(__dirname, 'data', 'users.txt');
const USER_PREFERENCES_FILE = path.join(__dirname, 'data', 'user_preferences.txt');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Register new user
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // validation
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return res.status(400).send('Username can only contain letters and digits');
    }

    if (password.length < 4 || !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/.test(password)) {
        return res.status(400).send('Password must be at least 4 characters long and contain at least one letter and one digit');
    }

    const users = fs.readFileSync(USERS_FILE, 'utf8').split('\n').filter(line => line.trim());

    // Check if username exists
    if (users.some(line => line.split(':')[0] === username)) {
        return res.status(400).send('Username already exists');
    }

    // Add new user
    fs.appendFileSync(USERS_FILE, `${username}:${password}\n`);
    
    res.redirect(`/dashboard.html?username=${username}`);
});

// Login user
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const users = fs.readFileSync(USERS_FILE, 'utf8').split('\n').filter(line => line.trim());

    // Find user
    const user = users.find(line => {
        const [storedUsername, storedPassword] = line.split(':');
        return storedUsername === username && storedPassword === password;
    });

    if (user) {
        res.redirect(`/dashboard.html?username=${username}`);
    } else {
        res.status(401).send('Invalid username or password');
    }
});

// Check if user has preferences
app.get('/check-preferences', (req, res) => {
    const username = req.query.username;
    
    if (!username) {
        return res.json({ hasPreferences: false });
    }
    
    // Read preferences file
    const preferences = fs.readFileSync(USER_PREFERENCES_FILE, 'utf8').split('\n').filter(line => line.trim());
    
    // Check if user has preferences
    const hasPreferences = preferences.some(line => line.startsWith(`${username}:`));
    
    return res.json({ hasPreferences });
});

// Save user preferences
app.post('/save-preferences', (req, res) => {
    const { username, allergies, cuisine, nutrition, additional } = req.body;
    
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }
    
    const preferences = fs.readFileSync(USER_PREFERENCES_FILE, 'utf8').split('\n').filter(line => line.trim());
    
    const updatedPreferences = preferences.filter(line => !line.startsWith(`${username}:`));
    
    updatedPreferences.push(`${username}:${allergies}:${cuisine}:${nutrition}:${additional}`);
    
    fs.writeFileSync(USER_PREFERENCES_FILE, updatedPreferences.join('\n') + '\n');
    
    res.json({ success: true });
});

// Get user preferences
app.get('/get-preferences', (req, res) => {
    const username = req.query.username;
    
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }
    
    // Read preferences file
    const preferences = fs.readFileSync(USER_PREFERENCES_FILE, 'utf8').split('\n').filter(line => line.trim());
    
    // Find user preferences
    const userPreference = preferences.find(line => line.startsWith(`${username}:`));
    
    if (userPreference) {
        const [_, allergies, cuisine, nutrition, additional] = userPreference.split(':');
        return res.json({
            allergies: allergies || 'none',
            cuisine: cuisine || '',
            nutrition: nutrition || '',
            additional: additional || ''
        });
    }
    
    // Return default preferences if none found
    return res.json({
        allergies: 'none',
        cuisine: '',
        nutrition: '',
        additional: ''
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 