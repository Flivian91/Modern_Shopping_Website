import { HeroSectionData, AboutCompanyData, renderCategories, loadCollection, renderMenCategory, renderWomenCategory, customerLoadData, hotDealsData, dealsData, topSellingData, recommendedData } from "./counter.js";

function init() {
  // Loads Hero section data
  HeroSectionData()
  // Loads about company Information
  AboutCompanyData()
  // Load Collection
  loadCollection()
  renderCategories()
  // Load mens Data
  renderMenCategory()
  // Load Women Collection
  renderWomenCategory()
  // Customer Information
  customerLoadData()
  hotDealsData()
  dealsData()
  topSellingData()
  recommendedData()
}
init()