export const queryKey = {
  scheme: () => ["scheme"],
  posts: (page: number) => ["posts", page], // add a page parameter and include it in the returned array
  tags: () => ["tags"],
  categories: () => ["categories"],
  post: (slug: string) => ["post", slug],
}