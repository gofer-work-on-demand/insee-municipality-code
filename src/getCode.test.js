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
  expect(getCode({ name: "Lyon" })).toBe("69387")
})

it("works for Chartres", () => {
  expect(getCode({ name: "Chartres", postalCode: "28000" })).toBe("28085")
})