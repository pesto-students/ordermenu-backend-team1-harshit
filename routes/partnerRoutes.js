const express = require("express");
const authController = require("../controllers/authController");
const partnerController = require("../controllers/partnerController");

const router = express.Router();

router.use(authController.protect);
router.use(partnerController.protect);
router.use(authController.restrictTo("partner"));

// Account ***
router
  .route("/")
  .get(partnerController.getAccount)
  .post(partnerController.createPartner)
  .patch(partnerController.updateAccount)
  .delete(partnerController.deleteAccount);


// ProductCategories ***
router
.route('/categories')
.get(partnerController.getAllProductCategories)
.post(partnerController.createCategory);

router
.route('/categories/:id')
.get(partnerController.getCategory)
.patch(partnerController.updateCategory)
.delete(partnerController.deleteCategory);

module.exports = router;
