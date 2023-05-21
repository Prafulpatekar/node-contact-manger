const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const mongoose = require("mongoose");

// @desc Get All Contacts
// @route GET /api/v1/contacts
// @access Private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json({
    data: contacts,
    message: "All available contacts",
  });
});

// @desc create  Contact
// @route POST /api/v1/contacts
// @access Private
const createContact = asyncHandler(async (req, res) => {
  //   console.log("Request body:", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const contact = await Contact.create({
    user_id:req.user.id,
    name,
    email,
    phone,
  });
  res.status(201).json({
    data: contact,
    message: "Contact Created successfully",
  });
});

// @desc Get All Contacts
// @route GET /api/v1/contacts
// @access Private
const getContact = asyncHandler(async (req, res) => {
  //   const contact = await Contact.findOne({_id:req.params.id});
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValidId) {
    res.status(400);
    throw new Error("Invalid id: Not found");
  }
  const contact = await Contact.findById(req.params.id);
  //   console.log("Conatct=>", contact);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  res.status(200).json({
    data: contact,
    message: `Contact id: ${req.params.id}`,
  });
});

// @desc Get All Contacts
// @route GET /api/v1/contacts
// @access Private
const updateContact = asyncHandler(async (req, res) => {
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValidId) {
    res.status(400);
    throw new Error("Invalid id: Not found");
  }
  const contact = await Contact.findById(req.params.id);
  //   console.log("Conatct=>", contact);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("User don't have permission to update contact")
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json({
    data: updatedContact,
    message: `Update contact id: ${req.params.id}`,
  });
});

// @desc Get All Contacts
// @route GET /api/v1/contacts
// @access Private
const deleteContact = asyncHandler(async (req, res) => {
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValidId) {
    res.status(400);
    throw new Error("Invalid id: Not found");
  }
  const contact = await Contact.findById(req.params.id);
  //   console.log("Conatct=>", contact);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("User don't have permission to delete contact")
  }
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({
    data: contact,
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
