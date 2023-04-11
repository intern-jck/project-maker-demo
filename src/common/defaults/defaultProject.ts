import type {ProjectType} from '@/common/types';

const defaultForm: ProjectType = {
  _id: '',
  link: '',
  
  folder_name: '',
  folder_id: '',

  name: '',
  date: {
    start_month: '',
    start_year: '',
    end_month: '',
    end_year: '',
  },

  client: '',
  client_url: '',
  short: '',
  info: '',

  tech: [],
  photos: [],
  github_url: '',
};


export default defaultForm;