import { HeroSectionData, AboutCompanyData, loadCollection, renderMenCategory, renderWomenCategory } from "./counter.js";

function init() {
  // Loads Hero section data
  HeroSectionData()
  // Loads about company Information
  AboutCompanyData()
  // Load Collection
  loadCollection()
  // Load mens Data
  renderMenCategory()
  // Load Women Collection
  renderWomenCategory()
}
init()