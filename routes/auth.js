const router = require('express').Router();
const controller = require('../controllers/authController');
const { check } = require('express-validator');

router.post(
    '/register',
    [
        check('username', 'Имя пользователя не может быть пустым').notEmpty(),
        check('password', 'Пароль не можеть быть меньше 8 символов').isLength({ min: 8 }),
        check('email', 'Некорректный email').isEmail(),
    ],
    controller.registration,
);
router.post('/login', controller.login);
router.get('/', controller.getUsers);

module.exports = router;
