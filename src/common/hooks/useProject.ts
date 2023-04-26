import { fetcher } from "@/modules/utils";
import useSWR from "swr";
import { ProjectType } from "@/common/types";

export default function useProject(projectId: string) {
  const { data, error, isLoading, mutate } = useSWR<ProjectType[]>(
    `/api/project/${projectId}`,
    fetcher
  );

  return {
    project: data,
    projectLoading: isLoading,
    projectError: error,
    mutateProject: mutate,
  };
}
