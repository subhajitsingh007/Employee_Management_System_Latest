import { leaveRequestModel } from "../models/leaveRequest.model.js";

//apply for leaves

export const createLeaveRequest = async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    const newLeave = await leaveRequestModel.create({
      user: req.user._id,   // Comes from protectRoute middleware
      leaveType,
      startDate,
      endDate,
      reason
    });

    res.status(201).json({ message: "Leave request submitted successfully", leave: newLeave });
  } catch (error) {
    console.error("Create Leave Error:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//get all leaves for employee (for each employee)

export const getMyLeaves = async (req, res) => {
  try {
    const myLeaves = await leaveRequestModel.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(myLeaves);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leave requests" });
  }
};

//get all leave requests (for admin)

export const getAllLeaves = async (req, res) => {
  try {
   
    const leaves = await leaveRequestModel
      .find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    

    res.status(200).json({
      message: "All leaves fetched successfully",
      leaves
    });
  } catch (error) {
    console.log("Error in get all leaves controller", error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
};

// Update Leave Status (Approve/Reject)


export const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const status = req.body.status?.toLowerCase(); // ensure lowercase

    //console.log("STATUS RECEIVED:", status); // for debug

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const leaveRequest = await leaveRequestModel.findById(id);
    if (!leaveRequest) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    leaveRequest.status = status; // lowercase value matches schema enum
    await leaveRequest.save();

    res.status(200).json({
      message: `Leave request ${status} successfully`,
      leaveRequest,
    });
  } catch (error) {
    console.log("Error in update leave status controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
