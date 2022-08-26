const express = require("express");
const authController = require("../controllers/authController");
const partnerController = require("../controllers/partnerController");

const router = express.Router();

router.use(authController.protect);
router.use(partnerController.protect);
router.use(authController.restrictTo("partner"));

router
  .route("/")
  .get(partnerController.getAllProductCategories)
  .post(partnerController.createCategory);

router
  .route("/:id")
  .get(partnerController.getCategory)
  .patch(partnerController.updateCategory)
  .delete(partnerController.deleteCategory);

module.exports = router;
