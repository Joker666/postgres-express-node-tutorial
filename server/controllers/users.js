const Organization = require('../models').Organization;
const User = require('../models').User;
const bcrypt = require('bcrypt');

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
          .then((user) => res.status(201).send(user))
          .catch((error) => res.status(400).send(error));
        });
      })
      .catch((error) => res.status(400).send(error));
  },
};
