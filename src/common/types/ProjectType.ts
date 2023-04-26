import type { DateType, PhotoType } from '@/common/types';

type ProjectType = {
  _id: string,
  folder_id: string,
  folder_name: string,
  slug: string,
  name: string,
  client: string,
  client_url: string,
  url: string,
  short: string,
  info: string,
  // date: {
  //   start_month: string,
  //   start_year: string,
  //   end_month: string,
  //   end_year: string,
  // },
  date: DateType,
  photos: PhotoType[],
  tech: string[],
  repos: string[],
};

export type { ProjectType };
