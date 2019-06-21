const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { projects } = require('./data.json');

app.set('view engine', 'pug');
app.use('/static', express.static('public'));

app.get('/layout', (req, res) => {
  res.render('layout');
});

app.get('/', (req, res) => {
  res.render('index', {projects: projects});
});

app.get('/about', (req, res) => {
  res.render('about');
});

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


app.listen(3000, () => {
    console.log('The application is running on localhost:3000')
});
