const copy = (small_object: any, big_object: any) => {
  Object.keys(small_object).forEach((key) => {
    small_object[key] = big_object[key]
  })
  return small_object
}

export { copy }