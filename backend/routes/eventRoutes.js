const express = require("express");
const Event = require("../models/event-model");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

router.post("/", async (req, res) => {
    const { title, date, description, meetingLink } = req.body;

    if (!title || !date) {
        return res.status(400).json({ message: "Title and Date are required" });
    }

    try {
        const newEvent = new Event({ title, date, description, meetingLink });
        await newEvent.save();
        res.status(201).json({ message: "Event added successfully", event: newEvent });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

module.exports = router;
