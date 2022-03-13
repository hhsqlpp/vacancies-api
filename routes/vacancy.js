const router = require('express').Router();
const controller = require('../controllers/vacancyController');

router.get('/', controller.getVacancies);
router.get('/:slug', controller.getVacancy);
router.delete('/delete/:id', controller.deleteVacancy);
router.post('/add', controller.createVacancy);

module.exports = router;
