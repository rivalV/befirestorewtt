const express = require('express');
const Multer = require('multer')
const router = express.Router();
const register = require('../controllers/register');
const login = require('../controllers/login');
const authMiddleware = require('../middleware/authMiddleware')
const { getProfile } = require('../controllers/profile');
const { updateName } = require('../controllers/updateName');

const multer = Multer({
    storage: Multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024
})

router.post('/register', register.registerUser);
router.post('/login', login.loginUser);

router.get('/profile', authMiddleware.authMiddleware, getProfile);

router.put('/updateName', authMiddleware.authMiddleware, updateName);

module.exports = router;