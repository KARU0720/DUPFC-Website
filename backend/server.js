const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // For environment variables

const app = express();
const url = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'DUPFC_Website'; // Use environment variable

// Create a single MongoClient instance
const client = new MongoClient(url, { useUnifiedTopology: true });

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Adjust this to your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

// API endpoint for registration form
app.post('/register', async (req, res) => {
    console.log('Received data:', req.body); // Log received data
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log("Connected correctly to server");

        const db = client.db(dbName);
        const col = db.collection('test'); // Collection name

        const registration = {
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            status: req.body.status,
            college: req.body.college,
            course: req.body.course,
            year: req.body.year,
            section: req.body.section,
            cys: req.body.cys,
            studentNumber: req.body.studentNumber,
            contactNumber: req.body.contactNumber,
            emailAddress: req.body.emailAddress,
            birthday: req.body.birthday,
            createdAt: new Date(),  // Add timestamp here
            role: req.body.role,
            position: req.body.position
        };

        const result = await col.insertOne(registration);
        res.status(201).json(result);
    } catch (err) {
        console.error('Error occurred:', err);
        res.status(500).json({ error: 'An error occurred' });
    } finally {
        await client.close();
    }
});

// API endpoint to get all registration entries
app.get('/registrations', async (req, res) => {
    try {
        await client.connect();
        console.log("Connected correctly to server");

        const db = client.db(dbName);
        const col = db.collection('test'); // Collection name

        const registrations = await col.find({}).toArray(); // Fetch all documents
        res.status(200).json(registrations);
    } catch (err) {
        console.error('Error occurred:', err);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Serve static HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve index.html from 'public' directory
});

// Ensure to close the client when the server shuts down
process.on('SIGINT', async () => {
    await client.close();
    process.exit();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
