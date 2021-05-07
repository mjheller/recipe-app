export const arrayToObject = (array) =>
array.reduce((obj, item) => {
  obj[item.uuid] = item
  return obj
}, {})