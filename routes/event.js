const router = require('express').Router();
const controller = require('../controllers/eventController');

router.get('/', controller.getEvents);
router.get('/:slug', controller.getEvent);
router.get('/add', controller.addEvent);
router.get('/edit', controller.changeEvent);

module.exports = router;
