import usePostsQuery from "./usePostsQuery"
import { getAllSelectItemsFromPosts } from "src/libs/utils/notion"

export const useTagsQuery = () => {
  const posts = usePostsQuery(1)
  const tags = getAllSelectItemsFromPosts("tags", posts)

  return tags
}
