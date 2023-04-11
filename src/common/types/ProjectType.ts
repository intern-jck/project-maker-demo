type ProjectType = {
  _id?: string,
  link?: string,
  folder_id: string,
  folder_name: string,
  name: string,
  short: string,
  info: string,
  date: {
    start_month: string,
    start_year: string,
    end_month: string,
    end_year: string,
  },
  client: string,
  client_url: string,
  github_url: string,
  photos: string[],
  tech: string[],
};

export default ProjectType;