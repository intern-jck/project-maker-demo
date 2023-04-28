import type { DateType, PhotoType, TechType, RepoType } from '@/common/types';

type ProjectType = {
  _id: string,

  folder_id: string,
  folder_name: string,

  slug: string,
  name: string,
  url: string,

  client: string,
  client_url: string,
  date: DateType,

  short: string,
  info: string,

  photos: PhotoType[],
  tech: TechType[],
  repos: RepoType[],
};

export type { ProjectType };
