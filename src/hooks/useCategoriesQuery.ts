import { DEFAULT_CATEGORY } from "src/constants"
import usePostsQuery from "./usePostsQuery"
import { getAllSelectItemsFromPosts } from "src/libs/utils/notion"

export const useCategoriesQuery = () => {
    const postsQuery = usePostsQuery(1) // pass 1 as the page parameter

    let categories = {};
    let postCount = 0;

    if (!postsQuery.isLoading && postsQuery.data) {
        const posts = postsQuery.data.pages.flat();
        categories = getAllSelectItemsFromPosts("category", posts);
        postCount = posts.length;
    }

    return {
        [DEFAULT_CATEGORY]: postCount,
        ...categories,
    }
}