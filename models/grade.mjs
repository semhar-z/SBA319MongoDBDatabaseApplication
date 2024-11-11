import mongoose from "mongoose";

// Define the Grade schema and model
const gradeSchema = new mongoose.Schema({
  learners_id: { type: Number, required: true },
  class_id: { type: Number, required: true },
  scores: [{ type: Number }],
});

// compound index on `learners_id` and `class_id`
gradeSchema.index({ learners_id: 1, class_id: 1 });


const Grade = mongoose.model("Grade", gradeSchema);

export  default Grade;