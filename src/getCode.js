import Fuse from "fuse.js"
import cities from "../data/cities.json"

const getCities = () => {
  return Object.keys(cities).map(insee => {
    const [postalCode, name] = cities[insee]
    return {
      insee,
      postalCode,
      name,
    }
  })
}

const fuse = new Fuse(getCities(), {
  shouldSort: true,
  id: "insee",
  keys: ["name", "postalCode"],
  threshold: 1.0,
})

export default ({ name = "", postalCode = "" } = {}) => {
  if (!name && !postalCode) {
    throw new Error("Please provide either name or postalCode")
  }
  const [insee] = fuse.search(`${postalCode} ${name}`)
  return insee
}
