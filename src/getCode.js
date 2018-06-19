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

let nameFuse, postalCodeFuse

export default ({ name = "", postalCode = "" } = {}) => {
  if (!nameFuse || !postalCodeFuse) {
    nameFuse = new Fuse(getCities(), {
      id: "insee",
      keys: ["name"],
      threshold: 1.0,
      includeScore: true,
    })
    postalCodeFuse = new Fuse(getCities(), {
      id: "insee",
      keys: ["postalCode"],
      threshold: 0.8,
      includeScore: true,
    })
  }
  if (!name && !postalCode) {
    throw new Error("Please provide either name or postalCode")
  }
  const nameCities = nameFuse.search(name)
  const postalCodeCities = postalCodeFuse.search(postalCode)
  const allCities = new Map()
  const addCityWithCoefficient = coefficient => ({ item: insee, score }) => {
    let existingScore = allCities.get(insee) || 0
    allCities.set(insee, existingScore + score * coefficient)
  }
  nameCities.forEach(addCityWithCoefficient(1))
  postalCodeCities.forEach(addCityWithCoefficient(1))
  const [[insee]] = [...allCities.entries()].sort(([insee1, score1], [insee2, score2]) => score1 - score2)
  return insee
}
