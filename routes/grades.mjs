import express from "express";
import Grade from "../models/grade.mjs";

const router = express.Router();

// Get all grade entries by learners_id
router.get("/:learners_id", async (req, res) => {
    try {
        const grades = await Grade.find({ learners_id: req.params.learners_id });
        if (grades.length === 0) {
            return res.status(404).send("No grades found for this learner.");
        }
        res.status(200).send(grades);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching grade entries.");
    }
});

// Add a new grade entry
router.post("/", async (req, res) => {
    const { learners_id, class_id, scores } = req.body;

    // Check if required fields are present
    if (!learners_id || !class_id || !scores) {
        return res.status(400).send("Please include learners_id, class_id, and scores.");
    }

    try {
        const newGrade = new Grade({ learners_id, class_id, scores });
        const savedGrade = await newGrade.save();
        res.status(201).json(savedGrade);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating new grade entry.");
    }
});

export default router;
