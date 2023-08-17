const router = require('express').Router();
const {
  getUserInfo,
  getUsers,
  getUserById,
  editUserInfo,
  editAvatar,
} = require('../controllers/users');
const {
  userIdValidation,
  userInformationChangeValidation,
  avatarChangeValidation,
} = require('../middlewares/validations');

router.get('/api/me', getUserInfo);
router.get('/api', getUsers);
router.get('/api/:userId', userIdValidation, getUserById);
router.patch('/api/me', userInformationChangeValidation, editUserInfo);
router.patch('/api/me/avatar', avatarChangeValidation, editAvatar);

module.exports = router;
