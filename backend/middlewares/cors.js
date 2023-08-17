// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
    'https://etiurin.nomoreparties.co',
  ];
  
function allowCors(req, res, next) {
    const { origin } = req.headers; 
    
    if (allowedCors.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
  
    next();
  };

  module.exports = () => allowCors;