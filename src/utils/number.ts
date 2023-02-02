const toPercent = (num: number) => {
  return (num * 100).toFixed(2) + "%"
}

const addZero = (num: number) => {
  if (num > 10) {
    return num
  }
  return '0' + num
}

export {
  toPercent,
  addZero
}