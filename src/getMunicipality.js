import cities from "../data/cities.json"

export default insee => {
  if (!/^(\d{2}|2[AB])\d{3}$/i.test(insee)) {
    throw new Error("Please provide a valid argument")
  }
  const city = cities[insee]
  if (city) {
    const [postalCode, name] = city
    return {
      postalCode,
      name,
    }
  }
  return null
}
