const bodyParser = require('body-parser');
const express = require('express');

// import api routes
const userRoutes = require('./api/routes/userRoutes');
const organizationRoutes = require('./api/routes/organizationRoutes');
const projectRoutes = require('./api/routes/projectRoutes');
const taskRoutes = require('./api/routes/taskRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


// api routes setting up here
app.use('/api/users', userRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

const port = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;