const express = require("express");

const { 
    renderIndex, 
    renderLogin, 
    renderRegister,
    registrarNuevo,
    login 
} = require("../controllers/indexControllers.js");
const validateRegister = require("../middlewares/validateRegister.js");
const router = express.Router();

router.get("/", renderIndex);
router.get("/login", renderLogin);
router.post("/login", login);
router.get("/register", renderRegister);
router.post("/register", validateRegister, registrarNuevo);

module.exports = router;