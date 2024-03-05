import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import PostCard from "src/routes/Feed/PostList/PostCard"
import { DEFAULT_CATEGORY } from "src/constants"
import usePostsQuery from "src/hooks/usePostsQuery"
import { TPost } from "src/types"

type Props = {
  q: string
}

const POSTS_PER_PAGE = 10 // 每页帖子数量

const PostList: React.FC<Props> = ({ q }) => {
  const router = useRouter()
  const [page, setPage] = useState(1) // 新增状态来存储当前页码
  const data = usePostsQuery(page, POSTS_PER_PAGE) // 修改这里以传递当前页码和每页帖子数量
  const [filteredPosts, setFilteredPosts] = useState<TPost[]>([])

  const currentTag = `${router.query.tag || ``}` || undefined
  const currentCategory = `${router.query.category || ``}` || DEFAULT_CATEGORY
  const currentOrder = `${router.query.order || ``}` || "desc"

  useEffect(() => {
    let newFilteredPosts = data.data || [] // 这里假设 data.data 是 TPost[] 类型的数组

    // 根据关键词 q 过滤帖子
    if (q) {
      newFilteredPosts = newFilteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(q.toLowerCase()) ||
          (post.summary &&
            post.summary.toLowerCase().includes(q.toLowerCase())) || // 检查 post.summary 是否存在
          (post.tags &&
            post.tags.some((tag) =>
              tag.toLowerCase().includes(q.toLowerCase())
            ))
      )
    }

    // 根据当前标签过滤帖子
    if (currentTag) {
      newFilteredPosts = newFilteredPosts.filter(
        (post) => post.tags && post.tags.includes(currentTag)
      )
    }

    // 根据当前分类过滤帖子
    if (currentCategory !== DEFAULT_CATEGORY) {
      newFilteredPosts = newFilteredPosts.filter(
        (post) => post.category && post.category.includes(currentCategory) // 使用 includes() 方法
      )
    }

    // 根据排序顺序调整帖子顺序
    if (currentOrder !== "desc") {
      newFilteredPosts = [...newFilteredPosts].reverse() // 注意：reverse() 会就地修改数组，所以使用展开运算符创建副本
    }

    setFilteredPosts(newFilteredPosts)
  }, [q, currentTag, currentCategory, currentOrder, data])

  // 加载下一页的函数
  const loadMorePosts = () => {
    setPage((prevPage) => prevPage + 1)
  }

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
  )
}

export default PostList
