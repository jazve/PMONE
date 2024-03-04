import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PostCard from "src/routes/Feed/PostList/PostCard";
import { DEFAULT_CATEGORY } from "src/constants";
import usePostsQuery from "src/hooks/usePostsQuery";

type Props = {
  q: string;
};

const PostList: React.FC<Props> = ({ q }) => {
  const router = useRouter();
  const [page, setPage] = useState(1); // 新增状态来存储当前页码
  const data = usePostsQuery(page); // 修改这里以传递当前页码
  const [filteredPosts, setFilteredPosts] = useState([]);

  const currentTag = `${router.query.tag || ``}` || undefined;
  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY;
  const currentOrder = `${router.query.order || ``}` || "desc";

  useEffect(() => {
    setFilteredPosts(() => {
      let newFilteredPosts = data; // 这里假设 data 已经是当前页的数据
      // keyword
      newFilteredPosts = newFilteredPosts.filter((post) => {
        const tagContent = post.tags ? post.tags.join(" ") : ""
        const searchContent = post.title + post.summary + tagContent
        return searchContent.toLowerCase().includes(q.toLowerCase())
      })

      // tag
      if (currentTag) {
        newFilteredPosts = newFilteredPosts.filter(
          (post) => post && post.tags && post.tags.includes(currentTag)
        )
      }

      // category
      if (currentCategory !== DEFAULT_CATEGORY) {
        newFilteredPosts = newFilteredPosts.filter(
          (post) =>
            post && post.category && post.category.includes(currentCategory)
        )
      }
      // order
      if (currentOrder !== "desc") {
        newFilteredPosts = newFilteredPosts.reverse()
      }

      return newFilteredPosts
    })
  }, [q, currentTag, currentCategory, currentOrder, data]); // 添加 data 作为依赖项

  // 加载下一页的函数
  const loadMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <div className="my-2">
        {!filteredPosts.length && (
          <p className="text-gray-500 dark:text-gray-300">Nothing! </p>
        )}
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
