const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ipAddresses', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Define IP schema
const ipSchema = new mongoose.Schema({
  ip: String
});

const IP = mongoose.model('IP', ipSchema);

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to add IP addresses
app.post('/api/ip', async (req, res) => {
  try {
    const { ip } = req.body;
    const newIP = new IP({ ip });
    await newIP.save();
    res.status(201).send('IP added successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Endpoint to get all IP addresses
app.get('/api/ip', async (req, res) => {
  try {
    const ips = await IP.find();
    res.json(ips);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Endpoint to delete all IP addresses
app.delete('/api/ip', async (req, res) => {
  try {
    await IP.deleteMany({});
    res.status(204).send('IP list cleared');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
