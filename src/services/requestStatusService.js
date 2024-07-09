const RequestStatus = require('../models/requestModel');

const createRequestStatus = async (requestId, status) => {
  try {
    const newStatus = new RequestStatus({ requestId, status });
    await newStatus.save();
    return newStatus;
  } catch (error) {
    throw new Error(`Error creating request status: ${error.message}`);
  }
};

const updateRequestStatus = async (requestId, status) => {
  try {
    const updatedStatus = await RequestStatus.findOneAndUpdate(
      { requestId },
      { status },
      { new: true, upsert: true } // upsert: true will create a new document if one doesn't exist
    );
    return updatedStatus;
  } catch (error) {
    throw new Error(`Error updating request status: ${error.message}`);
  }
};

const getRequestStatus = async (requestId) => {
  try {
    const status = await RequestStatus.findOne({ requestId });
    return status;
  } catch (error) {
    throw new Error(`Error retrieving request status: ${error.message}`);
  }
};

module.exports = {
  createRequestStatus,
  updateRequestStatus,
  getRequestStatus,
};
