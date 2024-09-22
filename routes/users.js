var express = require('express');
const { login, register, current } = require('../controllers/users');
var router = express.Router();
const { auth } = require('../middleware/auth');

/* api/user/login */
//req - возвращает тело запроса
//res - этой переменной мы отвечаем на запрос

router.post('/login', login);
/* api/user/register */
router.post('/register', register);
/* api/user/current */
router.get('/current', auth, current);

module.exports = router;
