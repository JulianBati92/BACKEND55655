const User = require('../models/User');

const verifyUser = async (req, res) => {
    try {
        const { userId, verificationCode } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.verificationCode !== verificationCode) {
            return res.status(400).json({ message: 'Invalid verification code' });
        }

        user.verified = true;
        await user.save();

        res.status(200).json({ message: 'User verified successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { verifyUser };