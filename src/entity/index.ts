type Tenant = {
  tenant_id: string,
  account: string
}

type Theme = {
  background: string,
  activeBackground: string,
  activeText: string,
  normalText: string,
  hoverBackground: string,
  hoverText: string,
}

type DataTimeline = {
  from: string,
  title: string,
  showDayAndMonth: boolean,
  message: string,
}

type Event = {
  reminder_date: string,
  title: string,
  info: string,
  type: string[],
}

interface Wiki {
  bid: string
  btId: string
  title: string
  blog_prex: string
  autosave_control: string
  content: string
  order: number
}

const wiki = (data: any) => {
  const { bid, btId, content, title, order } = data
  return {
    bid: bid,
    btId: btId,
    content: content,
    title: title,
    order: order
  } as Wiki
}

interface WikiType {
  btId: string
  btName: string
  blogs: Wiki[]
  order: number
}

const wikiType = (data: any) => {
  const { btId, btName, order } = data
  return {
    btId: btId,
    btName: btName,
    blogs: [],
    order: order,
  } as WikiType
}

export { Tenant, Theme, DataTimeline, Event, Wiki, wiki, WikiType, wikiType }
