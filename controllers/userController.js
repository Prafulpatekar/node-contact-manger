const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const accessTokenGenrator = require("../auth/token");

// @desc Register User
// @route POST /api/v1/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists!");
  }
  const hashed = await bcrypt.hash(password, 11);
  // console.log("Hashed password:", hashed);
  const user = await User.create({ username, email, password: hashed });
  if (user) {
    res.status(200).json({
      data: {
        _id: user.id,
        email: user.email,
      },
      message: "User has been registerd!",
    });
  } else {
    res.status(400);
    throw new Error("User data is invalid!");
  }
});

// @desc Login
// @route POST /api/v1/users/login
// @access public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please Provide email and password");
  }
  const user = await User.findOne({email});
  if (user && (await bcrypt.compare(password,user.password))){
    const accessToken = await accessTokenGenrator(user);
    res.status(200).json({
      accessToken,
    });
  }
  else{
    res.status(401);
    throw new Error("Email or password is invalid!")
  }
  
});

// @desc Get Current User
// @route GET /api/v1/users/current
// @access Private
const currentUser = asyncHandler(async (req, res) => {
  const user = req.user;
  res.status(200).json({
    data: user,
    message: "current a user",
  });
});

// @desc Get All Contacts
// @route GET /api/v1/contacts
// @access public
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    data: users,
    message: "All users",
  });
});

// @desc Get All Contacts
// @route GET /api/v1/contacts
// @access public
const deleteUser = asyncHandler(async (req, res) => {
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValidId) {
    res.status(400);
    throw new Error("Invalid id: Not found");
  }
  const contact = await User.findById(req.params.id);
  //   console.log("Conatct=>", contact);
  if (!contact) {
    res.status(404);
    throw new Error("User not found!");
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    data: contact,
    message: `Delete User id: ${req.params.id}`,
  });
});

module.exports = { registerUser, login, currentUser, getUsers, deleteUser };
