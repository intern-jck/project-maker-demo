import type DateType from './DateType'

type ProjectType = {
  _id: string,
  link: string,
  collection: string,
  name: string,
  short: string,
  info: string,
  // date: {
  //   start_month: string,
  //   start_year: string,
  //   end_month: string,
  //   end_year: string,
  // },
  date: DateType,
  client: string,
  client_url: string,
  github_url: string,
  photos: string[],
  tech: string[],
};

export default ProjectType;