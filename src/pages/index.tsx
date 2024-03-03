import Feed from "src/routes/Feed"
import { CONFIG } from "../../site.config"
import { NextPageWithLayout } from "../types"
import { getPosts } from "../apis"
import MetaConfig from "src/components/MetaConfig"
import { queryClient } from "src/libs/react-query"
import { queryKey } from "src/constants/queryKey"
import { GetStaticProps } from "next"
import { dehydrate } from "@tanstack/react-query"
import { filterPosts } from "src/libs/utils/notion"

export const getStaticProps: GetStaticProps = async () => {
  // 获取数据
  const posts = await getPosts()
  if (!Array.isArray(posts)) {
    // 如果获取到的数据不是数组，则返回一个空数组
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
      revalidate: CONFIG.revalidateTime,
    }
  }

  // 过滤数据
  const filteredPosts = filterPosts(posts)

  // 确保数据中的 thumbnail 字段不为 undefined
  filteredPosts.forEach(post => {
    if (typeof post.thumbnail === 'undefined') {
      post.thumbnail = null; // 或者你可以选择删除这个字段，如果可以的话
    }
  });

  await queryClient.prefetchQuery(queryKey.posts(1), () => filteredPosts)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: CONFIG.revalidateTime,
  }
}


const FeedPage: NextPageWithLayout = () => {
  const meta = {
    title: CONFIG.blog.title,
    description: CONFIG.blog.description,
    type: "website",
    url: CONFIG.link,
  }

  return (
    <>
      <MetaConfig {...meta} />
      <Feed />
    </>
  )
}

export default FeedPage

