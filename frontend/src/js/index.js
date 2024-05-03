import { HeroSectionData, AboutCompanyData, loadCollection, renderMenCategory, renderWomenCategory, customerLoadData, hotDealsData, dealsData, topSellingData, recommendedData, testimonialData } from "./counter.js";

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
  // Customer Information
  customerLoadData()
  hotDealsData()
  dealsData()
  topSellingData()
  recommendedData()
  testimonialData()
}
init()