const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
  category: { type: String, default: '' },
  name: { type: String, default: '' },
  github_url: { type: String, default: '' },
  link: { type: String, default: '' },
  client: { type: String, default: '' },
  client_url: { type: String, default: '' },
  date: {
    start_month: { type: String, default: '' },
    start_year: { type: String, default: '' },
    end_month: { type: String, default: '' },
    end_year: { type: String, default: '' },
  },
  short: { type: String, default: '' },
  info: { type: String, default: '' },
  tech: [],
  photos: [],
});

// We can use this schema to create
// a Project document for the Projects collection.
// The collection name will be lowercase when looking in mongosh.
const Project = mongoose.model('Projects', ProjectSchema);
module.exports = Project;
