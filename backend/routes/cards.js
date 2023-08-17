const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  disLikeCard,
} = require('../controllers/cards');
const { cardIdValidation, createCardValidation } = require('../middlewares/validations');

router.get('/api', getCards);
router.post('/api', createCardValidation, createCard);
router.delete('/api/:cardId', cardIdValidation, deleteCardById);
router.put('/api/:cardId/likes', cardIdValidation, likeCard);
router.delete('/api/:cardId/likes', cardIdValidation, disLikeCard);

module.exports = router;
