import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PostCard from "src/routes/Feed/PostList/PostCard";
import { DEFAULT_CATEGORY } from "src/constants";
import usePostsQuery from "src/hooks/usePostsQuery";

// 假设这是您的帖子类型定义，根据实际情况调整
type TPost = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  category: string;
};

type Props = {
  q: string;
};

const PostList: React.FC<Props> = ({ q }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = usePostsQuery(page); // 假设 usePostsQuery 返回一个对象，包含 data 以及 isLoading 和 isError 状态
  const [filteredPosts, setFilteredPosts] = useState<TPost[]>([]); // 明确指定状态类型为 TPost[]

  const currentTag = `${router.query.tag || ``}` || undefined;
  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY;
  const currentOrder = `${router.query.order || ``}` || "desc";

  useEffect(() => {
    // 直接操作 data.data，确保 data.data 是 TPost[] 类型
    let newFilteredPosts = data || []; // 假设 data 是 TPost[] 类型的数组
    // 进行过滤和排序操作...
    newFilteredPosts = newFilteredPosts.filter(/* ... */);

    setFilteredPosts(newFilteredPosts);
  }, [q, currentTag, currentCategory, currentOrder, data]);

  const loadMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts.</div>;

  return (
    <>
      <div className="my-2">
        {!filteredPosts.length && <p className="text-gray-500 dark:text-gray-300">Nothing!</p>}
        {filteredPosts.map((post) => (
          <PostCard key={post.id} data={post} />
        ))}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={loadMorePosts}
        >
          Load More
        </button>
      </div>
    </>
  );
};

export default PostList;
