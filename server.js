const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ipdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// IP Schema
const ipSchema = new mongoose.Schema({
    ipAddress: { type: String, unique: true }
});

const IP = mongoose.model('IP', ipSchema);

// Endpoint to get IP list
app.get('/api/ips', async (req, res) => {
    try {
        const ips = await IP.find();
        res.json(ips);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Endpoint to add an IP address
app.post('/api/ips', async (req, res) => {
    const { ipAddress } = req.body;
    try {
        const newIP = new IP({ ipAddress });
        await newIP.save();
        res.status(201).json(newIP);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'IP address already exists' });
        } else {
            res.status(500).json({ message: 'Server error' });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
