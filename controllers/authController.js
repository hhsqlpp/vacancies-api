const dotenv = require('dotenv');
dotenv.config();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const generateAccessToken = (id) => {
    const payload = { id };

    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });
};

class Controller {
    async registration(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Ошибка при регистрации', errors });
            }

            const { username, password, email } = req.body;
            const candidate = await User.findOne({ email: email });

            if (candidate) {
                return res.status(400).json('Пользователь с таким email уже существует');
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({ username, password: hashPassword, email });
            await user.save();

            return res.json({ message: 'Пользователь успешно зарегистрирован' });
        } catch (error) {
            console.log(error);
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });

            if (!user) {
                return res.status(400).json({ message: 'Пользователь с таким именем не найден' });
            }

            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                return res.status(400).json({ message: 'Введен неверный пароль' });
            }

            const token = generateAccessToken(user._id);

            return res.json({ token });
        } catch (error) {
            console.log(error);
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Controller();
