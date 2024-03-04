import { useQuery } from "@tanstack/react-query";
import { queryKey } from "src/constants/queryKey";
import { TPost } from "src/types";

// 修改fetchPosts函数，添加pageSize参数
const fetchPosts = async (page: number, pageSize: number): Promise<TPost[]> => {
  const response = await fetch(`/api/posts?page=${page}&limit=${pageSize}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// 修改usePostsQuery钩子，添加pageSize参数
const usePostsQuery = (page: number, pageSize: number) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: queryKey.posts(page), // 使用页码作为查询键的一部分
    queryFn: () => fetchPosts(page, pageSize), // 修改查询函数以传递pageSize参数
    // initialData: [] as TPost[], // 初始数据可以保留，但在这个上下文中可能不需要
  });

  // 错误处理
  if (isError) {
    console.error(error);
  }

  return {
    data: data || [], // 如果data为undefined，返回空数组
    isLoading,
    isError,
  };
};

export default usePostsQuery;