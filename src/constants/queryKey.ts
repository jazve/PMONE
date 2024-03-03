export const queryKey = {
  scheme: () => ["scheme"],
  posts: (page: number, pageSize: number) => ["posts", { page, pageSize }], // add a pageSize parameter and include it in the returned object
  tags: () => ["tags"],
  categories: () => ["categories"],
  post: (slug: string) => ["post", slug],
}