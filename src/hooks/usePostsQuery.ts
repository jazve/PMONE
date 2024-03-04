import { useQuery } from "@tanstack/react-query";
import { queryKey } from "src/constants/queryKey";
import { TPost } from "src/types";

// 假设的fetchPosts函数，根据页码获取数据
const fetchPosts = async (page: number): Promise<TPost[]> => {
  const response = await fetch(`/api/posts?page=${page}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const usePostsQuery = (page: number) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: queryKey.posts(page), // 使用页码作为查询键的一部分
    queryFn: () => fetchPosts(page), // 添加查询函数
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
