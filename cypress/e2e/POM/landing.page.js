export const LandingPage = {
  getZipCode(zipCode) {
    return cy.get(`[name="postalCode"]`).type(zipCode);
  },
  getSubmit() {
    return cy.get('[type="submit"]').click();
  },
  showsError(text) {
    return cy.contains('[class*="MuiFormHelperText-root"]', text);
  },
  noError() {
    cy.get('[class*="MuiFormHelperText-root"]').should("not.exist");
  },
};
