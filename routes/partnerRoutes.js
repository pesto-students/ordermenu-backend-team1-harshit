const express = require("express");
const authController = require("../controllers/authController");
const partnerController = require("../controllers/partnerController");

const router = express.Router();


router.route('/onboarding').post(partnerController.applyForPartner);

router.use(authController.protect);
router.use(partnerController.protect);
router.use(authController.restrictTo("partner"));

// Account ***
router
  .route("/partners")
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



router
  .route('/products')
  .get(partnerController.getProducts)
  .post(partnerController.createProduct);

router
  .route('/products/:id')
  .get(partnerController.getProduct)
  .patch(partnerController.updateProduct)
  .delete(partnerController.deleteProduct);


module.exports = router;
