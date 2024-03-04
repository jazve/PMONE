import { DEFAULT_CATEGORY } from "src/constants"
import usePostsQuery from "./usePostsQuery"
import { getAllSelectItemsFromPosts } from "src/libs/utils/notion"
import { CategoryData } from 'src/types';

export const useCategoriesQuery = () => {
  const { data: posts, isLoading, isError } = usePostsQuery(1);
  // 确保仅当posts有数据且不在加载或错误状态时调用getAllSelectItemsFromPosts
  const categories = posts && !isLoading && !isError ? getAllSelectItemsFromPosts("category", posts) as CategoryData : {};
  return {
    [DEFAULT_CATEGORY]: posts.length,
    ...categories,
  };
};
