const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer= require('../middleware/multer-config')

const StuffController = require("../controllers/stuff");

router.post("/", auth, multer, StuffController.createThing);
router.get("/", auth, StuffController.getAllStuff);
router.get("/:id", auth, StuffController.getOneThing);
router.put("/:id", auth, multer, StuffController.updateThing);
router.delete("/:id", auth, StuffController.deleteThing);
module.exports = router;
