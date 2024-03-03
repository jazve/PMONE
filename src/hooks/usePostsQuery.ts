import { useInfiniteQuery } from "@tanstack/react-query"
import { queryKey } from "src/constants/queryKey"
import { TPost } from "src/types"

const usePostsQuery = (pageSize: number = 10) => {
  return useInfiniteQuery(
    queryKey.posts,
    async ({ pageParam = 0 }) => {
      const response = await fetch(`/api/posts?page=${pageParam}&limit=${pageSize}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    {
      getNextPageParam: (lastPage, pages) => lastPage.nextPage,
    }
  );
};

export default usePostsQuery;