const mongoose = require('mongoose');

const RejectedStartupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  founder: { type: String, required: true },
  industry: { type: String, required: true },
  foundedDate: { type: Date, required: true },
  employees: { type: Number, required: true },
  website: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rejectionReason: { type: String, required: true },
  originalStartupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RejectedStartup', RejectedStartupSchema);