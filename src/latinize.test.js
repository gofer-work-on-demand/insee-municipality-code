import latinize from "./latinize"

it("removes accents", () => {
  expect(latinize("Voici un garçon qui énumère l'ouïe des œufs.")).toBe(
    "Voici un garcon qui enumere l'ouie des oeufs.",
  )
})
