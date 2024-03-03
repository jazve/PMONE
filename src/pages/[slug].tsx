import Detail from "src/routes/Detail"
import { filterPosts } from "src/libs/utils/notion"
import { CONFIG } from "site.config"
import { NextPageWithLayout } from "../types"
import CustomError from "src/routes/Error"
import { getRecordMap, getPosts } from "src/apis"
import MetaConfig from "src/components/MetaConfig"
import { GetStaticProps } from "next"
import { queryClient } from "src/libs/react-query"
import { queryKey } from "src/constants/queryKey"
import { dehydrate } from "@tanstack/react-query"
import usePostQuery from "src/hooks/usePostQuery"
import { FilterPostsOptions } from "src/libs/utils/notion/filterPosts"

import { GetStaticPaths } from 'next';
// 在你的代码下方添加 getStaticPaths 函数
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();
  const filteredPosts = filterPosts(posts, filter);

  // 获取所有帖子的 slug
  const paths = filteredPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false, // 或者 'blocking' 如果你需要在请求时生成新的页面
  };
};

const filter: FilterPostsOptions = {
  acceptStatus: ["Public", "PublicOnDetail"],
  acceptType: ["Paper", "Post", "Page"],
}

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug

  // 检查 slug 是否存在
  if (!slug) {
    return {
      notFound: true,
    }
  }

  const posts = await getPosts()
  const feedPosts = filterPosts(posts)
  await queryClient.prefetchQuery(queryKey.posts(1), () => feedPosts)

  const detailPosts = filterPosts(posts, filter)
  
  // 根据 slug 查找对应的 postDetail
  const postDetail = detailPosts.find((t: any) => t.slug === slug)

  // 检查 postDetail 是否存在
  if (!postDetail) {
    return {
      notFound: true,
    }
  }

  const recordMap = await getRecordMap(postDetail.id)

  // 确保 postDetail 和 recordMap 不是 undefined
  const safePostDetail = postDetail ?? {}
  const safeRecordMap = recordMap ?? {}

  await queryClient.prefetchQuery(queryKey.post(`${slug}`), () => ({
    ...safePostDetail,
    recordMap: safeRecordMap,
  }))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: CONFIG.revalidateTime,
  }
}

const DetailPage: NextPageWithLayout = () => {
  const post = usePostQuery()

  // 检查是否成功获取到 post 数据，如果没有则显示错误页面
  if (!post || !post.slug) return <CustomError />

  const image =
    post.thumbnail ??
    CONFIG.ogImageGenerateURL ??
    `${CONFIG.ogImageGenerateURL}/${encodeURIComponent(post.title)}.png`

  const date = post.date?.start_date || post.createdTime || ""

  const meta = {
    title: post.title,
    date: new Date(date).toISOString(),
    image: image,
    description: post.summary || "",
    type: post.type[0],
    url: `${CONFIG.link}/${post.slug}`,
  }

  return (
    <>
      <MetaConfig {...meta} />
      <Detail />
    </>
  )
}

DetailPage.getLayout = (page) => {
  return <>{page}</>
}

export default DetailPage
