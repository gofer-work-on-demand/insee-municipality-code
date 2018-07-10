import getCode from "./getCode"

it("throws if both name and postalCode are empty", () => {
  expect(() => getCode()).toThrow("Please provide either name or postalCode")
  expect(() => getCode({})).toThrow("Please provide either name or postalCode")
  expect(() => getCode({ name: "", postalCode: "" })).toThrow(
    "Please provide either name or postalCode",
  )
})

it("returns expected result when input is perfect", () => {
  expect(getCode({ name: "COLOMBIERES", postalCode: "14710" })).toBe("14168")
})

it("returns expected result when input is altered", () => {
  expect(getCode({ name: "Collonbier", postalCode: "14710" })).toBe("14168")
  expect(getCode({ name: "Colombieres", postalCode: "15710" })).toBe("14168")
  expect(getCode({ name: "Lyon" })).toBe("69383")
})

it("works for Chartres", () => {
  expect(getCode({ name: "Chartres", postalCode: "28000" })).toBe("28085")
})

it("works for Saint Denis", () => {
  expect(getCode({ name: "Saint-Denis", postalCode: "93200" })).toBe("93066")
})

it("works for Saint-Maur-Des-Fossés", () => {
  expect(
    getCode({
      name: "Saint-Maur-Des-Fossés",
      postalCode: "94100",
    }),
  ).toBe("94068")
  expect(
    getCode({
      name: "Saint maur des fosses",
      postalCode: "94100",
    }),
  ).toBe("94068")
})
