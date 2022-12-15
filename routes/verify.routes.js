

const { form } = require('../controller');
const {verify} = require('../controller/verify');
const {test} = require('../controller/test');

const router = require('express').Router();


router.put('/verify', verify);
router.put('/form', form);
router.post('/test', test);






module.exports = router;