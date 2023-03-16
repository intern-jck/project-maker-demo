const fs = require('fs');
const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const PORT = 3000;

const { createProject, getProjects, getProject, updateProject, deleteProject } = require('./db/controller.js');

// CREATE
app.post('/project', (req, res) => {
  createProject(req.body)
    .then((data) => (res.send(data)))
    .catch((error) => (console.log('create error', error)));
});

// READ
// Get all projects
app.get('/projects', (req, res) => {
  getProjects()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => (console.log('get projects error', error)));
});

// Get a single project
app.get('/project', (req, res) => {
  getProject(req.query._id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => (console.log('get project error', error)));
});

// UPDATE
app.put('/project', (req, res) => {
  updateProject(req.body)
    .then((data) => (res.sendStatus(202)))
    .catch((error) => (console.log('update error', error)));
});

// DELETE
app.delete('/project', (req, res) => {
  deleteProject(req.query.id)
    .then((data) => (res.sendStatus(202)))
    .catch((error) => (console.log('delete error', error)));
});

// Download
app.get('/download', (req, res) => {
  console.log('DOWNLOADING PROJECTS');
  getProjects()
    .then((data) => {
      const json = JSON.stringify(data);
      fs.writeFile('./downloads/projects.json', json, 'utf8', (error, data) => {
        if (error) {
          console.log(error)
        }
      });
      // res.sendStatus(200);
      res.json(data);
    })
    .catch((error) => (console.log('download error', error)));
});

app.listen(PORT, () => {
  console.log(`Project Maker @ http://127.0.0.1:${PORT}`);
});
