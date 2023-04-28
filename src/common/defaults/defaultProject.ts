import type { ProjectType } from '@/common/types';

const defaultForm: ProjectType = {
  _id: '',
  
  folder_name: '',
  folder_id: '',

  slug: '',
  name: '',
  url: '',

  client: '',
  client_url: '',
  date: {
    start_month: '',
    start_year: '',
    end_month: '',
    end_year: '',
  },

  short: '',
  info: '',

  photos: [],
  tech: [],
  repos: [],
};

export default defaultForm;
