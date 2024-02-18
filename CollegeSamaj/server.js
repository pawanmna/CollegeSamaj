// server.js - Express server code

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/college', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connected');
}).catch(err => {
    console.error('MongoDB Connection Error:', err);
});

// Define MongoDB Schema
const MessageSchema = new mongoose.Schema({
    text: String
});
const Message = mongoose.model('Message', MessageSchema);

// API Endpoint to get messages
app.get('/get-messages', async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        console.error('Error getting messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API Endpoint to save messages
app.post('/save-messages', async (req, res) => {
    const { messages } = req.body;
    try {
        await Message.deleteMany({}); // Clear existing messages
        await Message.insertMany(messages.map(text => ({ text })));
        res.sendStatus(200);
    } catch (error) {
        console.error('Error saving messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
