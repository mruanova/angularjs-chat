var usersController = require('../controllers/usersController.js');
var categoriesController = require('../controllers/categoriesController.js');
var topicsController = require('../controllers/topicsController.js');
var postsController = require('../controllers/postsController.js');

module.exports = function (app) {
    // login
    app.post("/api/login", usersController.login);
    // register user
    app.post("/api/users", usersController.create);
    // retrieve one / show one / find one
    app.get("/api/users/:id", usersController.show);

    // index / find / search / retrieve all / show all
    app.get("/api/categories", categoriesController.index);
    // Category create
    app.post("/api/categories", categoriesController.create);

    // retrieve one / show one / find one
    app.get('/api/topics/:id', topicsController.show);
    // index / find / search / retrieve all / show all
    app.get("/api/topics", topicsController.index);
    // create topic
    app.post("/api/topics", topicsController.create);

    // Post create
    app.post("/api/topics/:id/posts", postsController.create);
}
