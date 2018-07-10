import latinize from "./latinize"

export default (string = "") => {
  if (string === null) {
    string = ""
  }
  if (typeof string !== "string") {
    string = string.toString()
  }
  return latinize(string)
    .replace(/[^-0-9a-zA-Z .,'"]/g, " ")
    .replace(/\s+/g, " ")
    .toUpperCase()
    .trim()
}
