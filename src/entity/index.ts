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
  event_date: string,
  title: string,
  event_info: string,
}

export { Tenant, Theme, DataTimeline, Event }
