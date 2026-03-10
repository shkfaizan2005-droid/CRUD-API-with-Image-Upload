const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const productController = require("../controllers/productController");

router.post("/", upload.single("image"), productController.createProduct);

router.get("/", productController.getProducts);

router.get("/:id", productController.getProduct);

router.put("/:id", upload.single("image"), productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;