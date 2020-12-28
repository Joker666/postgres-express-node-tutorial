const User = require('../models').User;
const Project = require('../models').Project;
const Task = require('../models').Task;

module.exports = {
  create(req, res) {
    return User.findById(req.user.id).then(user => {
      if (user) {
        Project.findById(req.params.projectId).then(project => {
          if (project) {
            const t = {
              title: req.body.title,
              userId: user.id,
              projectId: project.id,
            };
            if (req.body.description) {
              t.description = req.body.description;
            }
            if (req.body.assignedUserId) {
              User.findById(req.body.assignedUserId).then(assignedUser => {
                if (assignedUser && assignedUser.organizationId === user.organizationId) {
                  t.assignedUserId = assignedUser.id;

                  Task.create(t).then((task) => res.status(201).send(task))
                  .catch((error) => res.status(400).send(error));
                } else {
                  throw new Error('User does not exist');
                }
              }).catch((error) => res.status(400).send(error));
            }
          } else {
            throw new Error('Project does not exist');
          }
        }).catch((error) => res.status(400).send(error));
      } else {
        throw new Error('Unauthenticated');
      }
    }).catch((error) => res.status(401).send(error));
  },
};
