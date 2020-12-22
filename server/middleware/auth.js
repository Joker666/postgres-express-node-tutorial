const jwt = require('../helper/jwt');

module.exports = {
  verify(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, (user) => {
      if (user) {
        req.user = user;
      } else {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      next();
    });
  },
};
