const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ipdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const ipSchema = new mongoose.Schema({
    ipAddress: { type: String, unique: true }
});
const IP = mongoose.model('IP', ipSchema);

module.exports = async (req, res) => {
    console.log(`Received ${req.method} request`);

    if (req.method === 'POST') {
        const { ipAddress } = req.body;
        try {
            const newIP = new IP({ ipAddress });
            await newIP.save();
            res.status(201).json(newIP);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    } else if (req.method === 'GET') {
        try {
            const ips = await IP.find();
            res.status(200).json(ips);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
