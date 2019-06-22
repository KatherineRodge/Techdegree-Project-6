const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { projects } = require('./data.json');

app.set('view engine', 'pug');
app.use('/static', express.static('public'));


//Sets ups layout
app.get('/layout', (req, res) => {
  res.render('layout');
});

//renders index and project data from .json file
app.get('/', (req, res) => {
  res.render('index', {projects: projects});
});

//renders about page
app.get('/about', (req, res) => {
  res.render('about');
});

//renders each project data when clicked on thumbnail
app.get( '/project/:id', ( req, res ) => {
  const projectId = req.params.id;
  const currentProject = projects[projectId];

  const name = currentProject.project_name;
  const tech = currentProject.technologies;
  const projectText = currentProject.description;
  const projectLink = currentProject.live_link;
  const projectGit = currentProject.github_link;
  const imgSrc = currentProject.image_urls;
  const count = 1;

  const currentProjectData = { name, tech, projectText, projectLink, projectGit, imgSrc, count}

  res.render('project', currentProjectData);
});

//error coding (via team treehouse express basics: middleware course)
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000')
});
