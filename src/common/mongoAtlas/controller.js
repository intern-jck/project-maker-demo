require('dotenv').config()
const mongoose = require('mongoose');
const Project = require('./model.js');

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const ATLAS_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@maincluster.25bxl8b.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const LOCAL_URI = `mongodb://127.0.0.1:27017/projects`;

mongoose.set('strictQuery', false);
mongoose.connect(ATLAS_URI)
  .then((data) => (console.log('mongo success!')))
  .catch((error) => (console.log(error)));

// Create a document
async function createProject(projectData) {
  try {
    console.log('creating', projectData.name)
    const newProject = await Project.create(projectData);
    return newProject;
  } catch (error) {
    console.log(error)
  }
};

// Read all documents
// Make queries promises with exec()
async function getProjects() {
  const projects = await Project.find().exec();
  return projects;
};

async function getProject(id) {
  const project = await Project.findById(id).exec();
  return project;
};

// Update a document
async function updateProject(projectData) {
  console.log('updating', projectData.name);
  // Format the link to be based on the name.
  // EX:  name: 'Project Name', link: 'project-name'
  const linkLowerCase = projectData.name ? projectData.name.toLowerCase().split(' ').join('-') : "";

  const filter = { '_id': projectData._id };

  const update = {
    category: projectData.category,
    name: projectData.name,
    link: `${linkLowerCase}`,
    client: projectData.client,
    client_url: projectData.client_url,
    date: projectData.date,
    short: projectData.short,
    info: projectData.info,
    tech: projectData.tech,
    photos: projectData.photos,
  };

  const options = { 'upsert': false };

  const updatedProject = await Project.findOneAndUpdate(filter, update, options).exec();
  return updatedProject;

};

// Delete a document
async function deleteProject(id) {
  console.log('deleting', id);
  const deletedProject = await Project.deleteOne({ _id: id }).exec();
  return deletedProject;
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};
