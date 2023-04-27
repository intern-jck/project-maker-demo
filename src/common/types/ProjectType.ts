import type { DateType, PhotoType, TechType, ReposType } from '@/common/types';

type ProjectType = {
  _id: string,

  folder_id: string,
  folder_name: string,

  slug: string,
  name: string,
  url: string,

  client: string,
  client_url: string,

  short: string,
  info: string,
  date: DateType,

  photos: PhotoType[],
  tech: TechType[],
  repos: ReposType[],
};

export type { ProjectType };
