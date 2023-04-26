import { fetcher } from "@/modules/utils";
import useSWR from "swr";
import { ProjectType } from "@/common/types";

export default function useFolders() {
  const { data, error, isLoading, mutate } = useSWR<ProjectType[]>(
    "/api/projects",
    fetcher
  );

  return {
    projectsData: data,
    projectsLoading: isLoading,
    projectsError: error,
    mutateProjects: mutate,
  };
}
