// import axios from 'axios';
import mongoose from 'mongoose';
const Project = require('./model');

// const SERVER_URL = 'https://upset-beret-moth.cyclic.app/';
// const SERVER_URL = 'http://127.0.0.1:3000';

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

const ATLAS_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@maincluster.25bxl8b.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(ATLAS_URI)
  .then((data) => (console.log('mongo success!')))
  .catch((error) => (console.log(error)));

async function getProjects() {
  const projects = await Project.find().exec();
  return projects;
};

async function getProject(id) {
  const project = await Project.findById(id).exec();
  return project;
};