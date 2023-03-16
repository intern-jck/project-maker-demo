type ProjectType = {
  category: String,
  name: String,
  github_url: String,
  link: String,
  client: String,
  client_url: String,
  date: {
    start_month: String,
    start_year: String,
    end_month: String,
    end_year: String,
  },
  short: String,
  info: String,
  tech: String[],
  photos: String[],
};

export default ProjectType;