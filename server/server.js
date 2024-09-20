const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the appropriate directories
app.use(express.static('../about_us'));
app.use(express.static('../contact_page'));
app.use(express.static('../dashboard_page'));
app.use(express.static('../feature_page'));
app.use(express.static('../learn_more_page'));
app.use(express.static('../login_page'));
app.use(express.static('../main_page'));
app.use(express.static('../privacy&policy'));
app.use(express.static('../terms and condition'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/vapt_tool', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});
const User = mongoose.model('User', UserSchema);

// Signup endpoint
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    try {
        await user.save();
        res.status(201).send('Account created');
    } catch (error) {
        res.status(400).send('Error creating account');
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, 'secret_key', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Invalid email or password');
    }
});

// Forgot password endpoint (basic example)
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        // Here you would normally send a reset link to the user's email
        res.status(200).send('Password reset link sent');
    } else {
        res.status(400).send('User not found');
    }
});

// Scan endpoint
app.post('/start-scan', (req, res) => {
    const url = req.body.url;
    console.log(`Starting scan for ${url}`);

    // Here we simulate running a vulnerability scan using an external tool
    exec(`echo "Scanning ${url}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error during scan: ${error}`);
            return res.status(500).send('Error during scan');
        }
        // Replace the echo command with your actual scan command
        // For example, if you use OWASP ZAP, it would be something like:
        // exec(`zap-cli -p 8080 quick-scan ${url}`, (error, stdout, stderr) => { ... });

        console.log(`Scan result: ${stdout}`);
        res.json({ result: stdout });
    });
});

// Serve main page as default
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: '../main_page' });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

