const Organization = require('../models').Organization;
const User = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('../helper/jwt');

module.exports = {
  create(req, res) {
    return Organization
      .findOrCreate({ where: { title: req.body.organization_name } })
      .spread((org, created) => {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            organizationId: org.id,
          })
          .then((user) => {
            let u = {
              id: user.id,
              name: user.name,
              email: user.email,
            };
            u.token = jwt.generateToken(u);
            res.status(201).send(u);
          })
          .catch((error) => res.status(400).send(error));
        });
      })
      .catch((error) => res.status(400).send(error));
  },
};
