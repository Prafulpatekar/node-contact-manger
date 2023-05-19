const asyncHandler = require("express-async-handler");

// @desc Get All Contacts
// @route GET /api/v1/contacts
// @access public
const getContacts = asyncHandler(async (req, res) => {
  res.status(200).json({
    data: [],
    message: "Get all contacts",
  });
});

// @desc create  Contact
// @route POST /api/v1/contacts
// @access public
const createContact = asyncHandler(async (req, res) => {
  console.log("Request body:", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  res.status(200).json({
    data: req.body,
    message: "Contact Created successfully",
  });
});

// @desc Get All Contacts
// @route GET /api/v1/contacts
// @access public
const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({
    data: [],
    message: `Get contact id: ${req.params.id}`,
  });
});

// @desc Get All Contacts
// @route GET /api/v1/contacts
// @access public
const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({
    data: [],
    message: `Update contact id: ${req.params.id}`,
  });
});

// @desc Get All Contacts
// @route GET /api/v1/contacts
// @access public
const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({
    data: [],
    message: `Delete contact id: ${req.params.id}`,
  });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
