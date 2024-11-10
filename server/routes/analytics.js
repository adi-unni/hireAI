const express = require('express');
const router = express.Router();

router.get('/conversations', async (req, res) => {
    try {
        // Fetch conversations from your database
        const conversations = await Conversation.find()
            .select('timestamp topic responses engagement_score')
            .lean();
            
        res.json(conversations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router; 