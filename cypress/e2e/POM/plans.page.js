export const PlansPage = {
  getPlan() {
    return cy.get('div[class*="MuiPaper-root"]');
  },
  getCheckbox() {
    return cy.get('[type="checkbox"]');
  },
};
