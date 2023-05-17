const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");

router.get("/", documentController.getAll);

router.get("/:id", documentController.getSingle);

router.post("/add", documentController.create);

router.put("/update/:id", documentController.update);

module.exports = router;
