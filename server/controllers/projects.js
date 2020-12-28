const User = require('../models').User;
const Project = require('../models').Project;

const { UnauthenticatedError } = require('../errors/apiErrors');

module.exports = {
  create(req, res, next) {
    return User.findById(req.user.id).then(user => {
      if (user) {
        Project.create({
          title: req.body.title,
          userId: user.id,
          organizationId: user.organizationId,
        }).then((project) => res.status(201).send(project))
        .catch((error) => res.status(400).send(error));
      } else {
        throw new UnauthenticatedError('Unauthenticated');
      }
    }).catch(next);
  },
};
