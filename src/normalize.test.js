import normalize from "./normalize"

it("returns a string", () => {
  expect(normalize()).toBe("")
  expect(normalize(undefined)).toBe("")
  expect(normalize(null)).toBe("")
  expect(normalize(5)).toBe("5")
  expect(normalize(0)).toBe("0")
})

it("puts all characters in upper case", () => {
  expect(normalize("HELLO world!")).toBe("HELLO WORLD")
})

it("trims white space", () => {
  expect(normalize("  Aymeric\n")).toBe("AYMERIC")
})

it("replaces accents", () => {
  expect(normalize("Éléonore")).toBe("ELEONORE")
})

it("removes non alphanumeric characters", () => {
  expect(normalize("L'Hay-les-Roses")).toBe("L'HAY LES ROSES")
  expect(normalize("Mme.")).toBe("MME.")
  expect(normalize("test 女 kanji")).toBe("TEST KANJI")
})

it("removes duplicate spaces", () => {
  expect(normalize("AYmeric   Bouzy")).toBe("AYMERIC BOUZY")
})
