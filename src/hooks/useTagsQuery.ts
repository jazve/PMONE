import usePostsQuery from "./usePostsQuery"
import { getAllSelectItemsFromPosts } from "src/libs/utils/notion"

export const useTagsQuery = () => {
  const { data: posts, isLoading, isError } = usePostsQuery(1,10);
  // 只有当posts数据可用时才尝试获取tags
  const tags = !isLoading && !isError ? getAllSelectItemsFromPosts("tags", posts) : [];

  return tags;
};

