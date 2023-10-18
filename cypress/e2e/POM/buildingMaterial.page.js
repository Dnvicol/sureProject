export const BuildingMaterialPage = {
  getRadioButton() {
    return cy.get(`[type="radio"]`);
  },
  getNextButton() {
    return cy.get('[type="submit"]').click();
  },
  selectStraw() {
    return this.getRadioButton().eq(0).check();
  },
};
BuildingMaterialPage;
