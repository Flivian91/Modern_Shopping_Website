import { HeroSectionData, AboutCompanyData, loadCollection } from "./counter.js";

function init() {
  // Loads Hero section data
  HeroSectionData()
  // Loads about company Information
  AboutCompanyData()
  // Load Collection
  loadCollection()
}
init()