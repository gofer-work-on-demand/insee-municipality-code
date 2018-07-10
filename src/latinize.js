import latinMap from "./latinMap.json"

export default string =>
  string.replace(/[^A-Za-z0-9 .']/g, a => latinMap[a] || a)
