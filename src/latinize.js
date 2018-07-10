import latinMap from "../data/latinMap.json"

export default string =>
  string.replace(/[^A-Za-z0-9 .']/g, a => latinMap[a] || a)
