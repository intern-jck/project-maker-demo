import {fetcher} from '@/common/modules/utils';
import useSWR from 'swr';
import {FolderType} from '@/common/types';

export default function useFolders() {

  const { data, error, isLoading, mutate } = useSWR<FolderType[]>('/api/folders', fetcher);

  return {
    data,
    isLoading,
    error,
    mutate
  }
};
