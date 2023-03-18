type ProjectType = {
  _id: string | '',
  category: string | '',
  name: string | '',
  github_url: string | '',
  link: string | '',
  client: string | '',
  client_url: string | '',
  date: {
    start_month: string | '',
    start_year: string | '',
    end_month: string | '',
    end_year: string | '',
  },
  short: string | '',
  info: string | '',
  tech: string[] | [],
  photos: string[] | [],
};

export default ProjectType;