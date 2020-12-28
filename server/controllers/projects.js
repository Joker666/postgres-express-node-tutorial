const User = require('../models').User;
const Project = require('../models').Project;

module.exports = {
  create(req, res) {
    return User.findById(req.user.id).then(user => {
      if (user) {
        Project.create({
          title: req.body.title,
          userId: user.id,
          organizationId: user.organizationId,
        }).then((project) => res.status(201).send(project))
        .catch((error) => res.status(400).send(error));
      } else {
        throw new Error('Unauthenticated');
      }
    }).catch((error) => res.status(401).send(error));
  },
};
