const mongoose = require('mongoose');
const { NowRequest, NowResponse } = require('@vercel/node');

// Connect to MongoDB (you can use a cloud-hosted MongoDB like MongoDB Atlas)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ipdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define the IP Schema
const ipSchema = new mongoose.Schema({
    ipAddress: { type: String, unique: true }
});
const IP = mongoose.model('IP', ipSchema);

module.exports = async (req = NowRequest, res = NowResponse) => {
    if (req.method === 'POST') {
        const { ipAddress } = req.body;
        try {
            const newIP = new IP({ ipAddress });
            await newIP.save();
            res.status(201).json(newIP);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === 'GET') {
        try {
            const ips = await IP.find();
            res.status(200).json(ips);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
