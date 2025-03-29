const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true }, // Store date as ISO string (YYYY-MM-DD)
    description: { type: String },
    meetingLink: { type: String },
});

module.exports = mongoose.model('Event', eventSchema);
