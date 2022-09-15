const express = require('express');

const { partnerController } = require('../../controllers/')


const auth = require('../../middlewares/auth')
const router = express.Router();

router.get('/partner', auth('partners'), partnerController.getPartnerByOwnerId);
router.post('/partners', partnerController.createPartnerAccount);
router.get('/partners', partnerController.getAllPartners);
router.get('/partners/:slug', partnerController.getPartnerBySlug);
router.patch('/partners/:id', auth('partners'), partnerController.updatePartnerById);
router.delete('/partners/:id', auth('partners'), partnerController.deletePartnerById);

module.exports = router