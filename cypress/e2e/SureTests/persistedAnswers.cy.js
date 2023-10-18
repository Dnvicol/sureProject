import { LandingPage } from "../POM/landing.page";
import { BuildingMaterialPage } from "../POM/buildingMaterial.page";
import { PlansPage } from "../POM/plans.page";

describe("Story6: Customer can refresh the page and see my answers persisted.", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("h1", "Hurricane Insurance");
    cy.completeQuoteForm("33101", "Straw", "Yes");
  });
  it("TC-017-Validate that all the answers should be persisted within a browser session after refreshing the page.", () => {
    PlansPage.getPlan().should("have.length", 2);
    PlansPage.getCheckbox().check();
    cy.reload();
    cy.getAllSessionStorage().then((result) => {
      const expectedData = {
        "https://sure-qa-challenge.vercel.app": {
          "application:postalCode": "33101",
          "application:waterProximity": "true",
          "application:buildingMaterial": "straw",
        },
      };
      expect(result).to.deep.equal(expectedData);
    });
    PlansPage.getCheckbox().should("be.checked");
  });

  it("TC-018-Validate that selected answers persist upon navigation.", () => {
    PlansPage.getPlan().should("have.length", 2);
    cy.go("back");
    cy.contains("label.MuiFormControlLabel-root", "Yes")
      .find('[type="radio"]')
      .should("be.checked");
    cy.go("back");
    cy.contains("label.MuiFormControlLabel-root", "Straw")
      .find('[type="radio"]')
      .should("be.checked");
    cy.go("back");
    cy.contains("h1", "Hurricane Insurance");
  });

  it("TC-020-Validate that the answer is reset after entering a new zip code from the landing page.", () => {
    PlansPage.getPlan().should("have.length", 2);
    cy.go("back");
    cy.contains("label.MuiFormControlLabel-root", "Yes")
      .find('[type="radio"]')
      .should("be.checked");
    cy.go("back");
    cy.contains("label.MuiFormControlLabel-root", "Straw")
      .find('[type="radio"]')
      .should("be.checked");
    cy.go("back");
    cy.contains("h1", "Hurricane Insurance");
    LandingPage.getZipCode("12345").should("be.visible");
    LandingPage.getSubmit();
    BuildingMaterialPage.getRadioButton().should("not.be.checked");
  });
});

describe("TC-019-Validate that the answer is cleared upon closing the browser window or tab.", () => {
  it("Successfully selected Complete Plan", () => {
    cy.visit("/");
    cy.contains("h1", "Hurricane Insurance");
    cy.completeQuoteForm("33101", "Straw", "Yes");
    PlansPage.getPlan().should("have.length", 2);
    PlansPage.getCheckbox().check();
    cy.getAllSessionStorage().then((result) => {
      const expectedData = {
        "https://sure-qa-challenge.vercel.app": {
          "application:postalCode": "33101",
          "application:waterProximity": "true",
          "application:buildingMaterial": "straw",
        },
      };
      expect(result).to.deep.equal(expectedData);
    });
  });

  it("Validate the cleared answers", () => {
    cy.visit("/quote");
    cy.getAllSessionStorage().then((result) => {
      expect(result).to.be.empty;
    });
    PlansPage.getCheckbox().should("not.be.checked");
  });
});
