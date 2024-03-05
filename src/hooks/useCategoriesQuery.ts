import { DEFAULT_CATEGORY } from "src/constants"
import usePostsQuery from "./usePostsQuery"
import { getAllSelectItemsFromPosts } from "src/libs/utils/notion"
import { CategoryData } from 'src/types';

export const useCategoriesQuery = () => {
  const { data: posts, isLoading, isError } = usePostsQuery(1, 10); // 假设你的API支持这个大的pageSize
  const categories = posts && !isLoading && !isError ? getAllSelectItemsFromPosts("category", posts) as CategoryData : {};
  return {
    [DEFAULT_CATEGORY]: posts.length,
    ...categories,
  };
};
