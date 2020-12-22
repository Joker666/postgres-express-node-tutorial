const Organization = require('../models').Organization;
const User = require('../models').User;

module.exports = {
  create(req, res) {
    return Organization
      .create({
        title: req.body.title,
        // name: req.body.name,
        // email: req.body.email,
        // password: req.body.password,
        // organizationId: req.body.organizationId,
      })
      .then((user) => res.status(201).send(user))
      .catch((error) => res.status(400).send(error));
  },
};
