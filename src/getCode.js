import Fuse from "fuse.js"
import cities from "../data/cities.json"
import normalize from "./normalize"

const getCitiesByPostalCode = ({ postalCode, cities }) =>
  cities.filter(city => city.postalCode == postalCode)
const getCitiesByName = ({ name, cities }) => {
  const uppercaseName = normalize(name)
  return cities.filter(city => normalize(city.name) === uppercaseName)
}

let nameFuse, postalCodeFuse

export default ({ name = "", postalCode = "" } = {}) => {
  if (!name && !postalCode) {
    throw new Error("Please provide either name or postalCode")
  }
  if (!nameFuse || !postalCodeFuse) {
    nameFuse = new Fuse(cities, {
      id: "insee",
      keys: ["name"],
      threshold: 1.0,
      includeScore: true,
    })
    postalCodeFuse = new Fuse(cities, {
      id: "insee",
      keys: ["postalCode"],
      threshold: 0.8,
      includeScore: true,
    })
  }
  if (postalCode) {
    const postalCodeCities = getCitiesByPostalCode({ postalCode, cities })
    if (postalCodeCities.length && name) {
      const exactCities = getCitiesByName({ name, cities: postalCodeCities })
      if (exactCities.length) {
        return exactCities[0].insee
      }
    }
  }
  if (name) {
    const nameCities = getCitiesByName({ name, cities })
    if (nameCities.length === 1) {
      return nameCities[0].insee
    }
  }
  const nameCities = nameFuse.search(name)
  const postalCodeCities = postalCodeFuse.search(postalCode)
  const allCities = new Map()
  const addCityWithCoefficient = coefficient => ({ item: insee, score }) => {
    const existingScore = allCities.get(insee) || 0
    allCities.set(insee, existingScore + score * coefficient)
  }
  nameCities.forEach(addCityWithCoefficient(1))
  postalCodeCities.forEach(addCityWithCoefficient(1))
  const [[insee]] = [...allCities.entries()].sort(
    ([, score1], [, score2]) => score1 - score2,
  )
  return insee
}
