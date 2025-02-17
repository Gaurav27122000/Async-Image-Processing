const mongoose = require('mongoose');
const { Schema } = mongoose;

const requestStatusSchema = new Schema(
  {
    requestId: { type: String, required: true, unique: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

const RequestStatus = mongoose.model('RequestStatus', requestStatusSchema);
module.exports = RequestStatus;
