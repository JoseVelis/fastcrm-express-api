import mongoose from 'mongoose';
const { Schema } = mongoose;

const templateSchema = new Schema({
  type: {type: String, default: 'welcome'},
  content: String,
  labels: [{ label: String}],
  author: String,
  createdAt: { type: Date, default: Date.now }
});


export const Templates = mongoose.model('Templates', templateSchema);