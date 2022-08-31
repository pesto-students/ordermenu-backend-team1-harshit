const express = require('express');

const { partnerController } = require('../../controllers/')

const router = express.Router();

router.post('/partners', partnerController.createPartnerAccount);
router.get('/partners', partnerController.getAllPartners);
router.get('/partners/:slug', partnerController.getPartnerBySlug);
router.patch('/partners/:id', partnerController.updatePartnerById);
router.delete('/partners/:id', partnerController.deletePartnerById);

module.exports = router