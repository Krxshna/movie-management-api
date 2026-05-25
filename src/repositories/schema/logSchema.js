import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  logId: {
    type: String,
    required: true,
  },
  logMessage: {
    type: String,
    required: true,
    default: 'This message will be displayed if any log message not given'
  },
  logObject: {
    type: mongoose.Schema.Types.Mixed,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Log = mongoose.model('Log',logSchema);

export default Log;