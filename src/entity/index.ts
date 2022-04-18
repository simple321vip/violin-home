type Blog = {
  blog_id: string,
  blog_type_id: string,
  blog_type_name: string,
  blog_title: string,
  blog_prex: string
}

type BlogType = {
  blog_type_id: string,
  blog_type_name: string,
  blog_list: Blog[]
}

export { Blog, BlogType }