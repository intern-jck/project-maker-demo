import axios from 'axios';
// const SERVER_URL = 'https://upset-beret-moth.cyclic.app/';
const SERVER_URL = 'http://127.0.0.1:3000';

// CREATE
async function createProject() {
  // Create random project name as default
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  let randomName = '';
  for (let i = 0; i < 8; i++) {
    randomName += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  const body = { 'name': `proj-${randomName}` };

  try {
    const response = await axios.post(`${SERVER_URL}/project`, body);
    const data = response.data;
    return data;
  } catch (error) {
    return error;
  }
};

// READ
async function getProjects() {
  try {
    const response = await axios.get(`${SERVER_URL}/projects`);
    const data = response.data;
    return data;
  } catch (error) {
    return error;
  }
};

async function getProject(id) {
  try {
    const response = await axios.get(`${SERVER_URL}/project`, { params: { _id: id } });
    const data = response.data;
    console.log(id, data)
    return data;
  } catch (error) {
    return error;
  }
};

// UPDATE
async function updateProject(body) {
  try {
    const response = await axios.put(`${SERVER_URL}/project`, body);
    const data = response.data;
    return data;
  } catch (error) {
    return error;
  }
};

// DELETE
async function deleteProject(id) {
  try {
    const response = await axios.delete(`${SERVER_URL}/project?id=${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    return error;
  }
};

// Get project data as a json
async function getProjectsJson(data) {
  try {
    const response = await axios.get(`${SERVER_URL}/download`);
    const data = response.data;
    return data;
  } catch (error) {
    return error;
  }
};

export const atlasApi = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  getProjectsJson,
}
