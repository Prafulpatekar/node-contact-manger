const express = require("express");
const router = express.Router();
const {
    registerUser,
    login,
    currentUser,
    deleteUser,
    getUsers
} = require("../controllers/userController");
const validateToken = require("../auth/validateTokenHandler");

router.get("/",validateToken,getUsers);
router.post("/register",registerUser);
router.post("/login",login);
router.get("/current",validateToken,currentUser);
router.delete("/delete/:id",validateToken,deleteUser);

module.exports = router;