const express = require('express');

const router = express.Router()

router.use(require('./auth.route'))
router.use(require('./category.route'))
router.use(require('./order.route'))
router.use(require('./partner.route'))
router.use(require('./product.route'))
router.use(require('./table.route'))
router.use(require('./user.route'))

module.exports = router;