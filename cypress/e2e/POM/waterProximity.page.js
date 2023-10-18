export const WaterProximityPage = {
  getRadioButton() {
    return cy.get(`[type="radio"]`);
  },
  getNextButton() {
    return cy.get('[type="submit"]').click();
  },
  selectProximity(response) {
    cy.contains("label.MuiFormControlLabel-root", response)
      .should("exist")
      .find('[type="radio"]')
      .check();
  },
};
