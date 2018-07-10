import cities from "../data/cities.json"

export default (insee, { postalCode } = {}) => {
  if (!/^(\d{2}|2[AB])\d{3}$/i.test(insee)) {
    throw new Error("Please provide a valid argument")
  }
  const matchingCities = cities.filter(city => city.insee === insee)
  if (matchingCities.length === 0) {
    return null
  }
  if (matchingCities.length === 1) {
    return matchingCities[0]
  }
  const postalCodeMatchingCities = matchingCities.filter(
    city => city.postalCode === String(postalCode),
  )
  if (postalCodeMatchingCities.length === 0) {
    return matchingCities[0]
  }
  return postalCodeMatchingCities[0]
}
