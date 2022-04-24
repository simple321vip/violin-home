type Blog = {
  bid: string,
  btId: string,
  btName: string,
  title: string,
  blog_prex: string,
  content: string
}

type BlogType = {
  btId: string,
  btName: string,
  blog_list: Blog[]
}

type User = {
  id: string,
  username: string
}

export { Blog, BlogType, User }
