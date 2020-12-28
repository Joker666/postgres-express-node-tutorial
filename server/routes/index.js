const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const usersController = require('../controllers').users;
const projectsController = require('../controllers').projects;
const tasksController = require('../controllers').tasks;

const auth = require('../middleware/auth');

module.exports = (router) => {
  router.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  router.post('/api/users/create', usersController.create);

  router.post('/api/projects/create', auth.verify, projectsController.create);
  router.post('/api/projects/:projectId/tasks/create', auth.verify, tasksController.create);
  // app.post('/api/todos', todosController.create);
  router.get('/api/tasks/list', auth.verify, tasksController.list);
  // app.get('/api/todos/:todoId', todosController.retrieve);
  // app.put('/api/todos/:todoId', todosController.update);
  // app.delete('/api/todos/:todoId', todosController.destroy);
  //
  // app.post('/api/todos/:todoId/items', todoItemsController.create);
  // app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);
  // app.delete(
  //   '/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy
  // );
  router.all('/api/todos/:todoId/items', (req, res) => res.status(405).send({
    message: 'Method Not Allowed',
  }));
};
