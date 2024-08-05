const jwt = require('jsonwebtoken');
const config = require('config');

let verifyToken = (req, res, next) => {
  let token = req.get('Authorization');

  jwt.verify(token, config.get('configToken.SEED'), (error, decoded) => {
    if (error) {
      return res.status(401).json({ error })
    }

    req.user = decoded.user;
    next();
  });
}

module.exports = verifyToken;