import { useQuery } from "@tanstack/react-query"
import { queryKey } from "src/constants/queryKey"
import { TPost } from "src/types"

const usePostsQuery = (page: number, pageSize: number = 10) => { // add a pageSize parameter with a default value of 10
  const { data } = useQuery({
    queryKey: queryKey.posts(page, pageSize), // pass the page and pageSize to the query key
    initialData: [] as TPost[],
    enabled: false,
  })

  if (!data) throw new Error("Posts data is not found")

  return data
}

export default usePostsQuery