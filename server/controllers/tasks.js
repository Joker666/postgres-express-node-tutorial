const User = require('../models').User;
const Project = require('../models').Project;
const Task = require('../models').Task;
const db = require('../models/index');
const { UnauthenticatedError, NotFoundError } = require('../errors/apiErrors');

module.exports = {
  create(req, res, next) {
    return User.findById(req.user.id).then(user => {
      if (user) {
        Project.findById(req.params.projectId).then(project => {
          if (project) {
            if (project.organizationId === user.organizationId) {
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
                    throw new NotFoundError('User does not exist');
                  }
                }).catch(next);
              }
            } else {
              throw new NotFoundError('Project does not exist');
            }
          } else {
            throw new NotFoundError('Project does not exist');
          }
        }).catch(next);
      } else {
        throw new UnauthenticatedError('Unauthenticated');
      }
    }).catch(next);
  },

  list(req, res, next) {
    return User.findById(req.user.id).then(user => {
      if (user) {
        const q = {};
        if (req.query.projectId) {
          q.projectId = req.params.projectId;
        }
        if (req.query.assignedUserId) {
          q.assignedUserId = req.params.assignedUserId;
        }
        if (req.query.complete) {
          q.complete = req.query.complete === 'true';
        }

        Project.findAll({
          where: { organizationId: user.organizationId },
        }).then(projects => {
          const pIds = projects.map(project => {
            return project.id;
          });

          q.projectId = { [db.Sequelize.Op.in]: pIds };
          Task
            .findAndCountAll({
              where: q,
              offset: req.params.offset || 0,
              limit: req.params.offset || 10,
              order: [
                ['createdAt', 'DESC'],
              ],
            })
            .then(result => {
              const meta = {
                offset: req.params.offset || 0,
                limit: req.params.offset || 10,
                total: result.count,
              };
              res.status(201).send({ data: result.rows,
                meta });
            }).catch(next);
        }).catch(next);
      } else {
        throw new UnauthenticatedError('Unauthenticated');
      }
    }).catch(next);
  },
};
