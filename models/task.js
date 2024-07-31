// models/taskModel.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true },
  tag: { type: String, required: true },
  deadline: { type: Date, required: true },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;
