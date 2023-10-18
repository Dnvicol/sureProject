import { LandingPage } from "../POM/landing.page";
import { BuildingMaterialPage } from "../POM/buildingMaterial.page";
import { WaterProximityPage } from "../POM/waterProximity.page";
import { PlansPage } from "../POM/plans.page";

describe("Story 5: Customer can see the available plans offered to me.", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("h1", "Hurricane Insurance");
    LandingPage.getZipCode("33101").should("be.visible");
    LandingPage.getSubmit();
    BuildingMaterialPage.selectStraw().should("be.checked");
    BuildingMaterialPage.getNextButton();
  });

  it('TC-014- Validated that if customer selected "No" for the Water Proximity question, it should see a "Standard" and "Complete" plan options and should see a disabled, checked checkbox with the label "Flood Protection Included" within the Complete plan', () => {
    WaterProximityPage.getRadioButton().should("not.be.checked");
    WaterProximityPage.selectProximity("No");
    WaterProximityPage.getNextButton();
    PlansPage.getPlan().should("have.length", 2);
    cy.contains("h3", "Standard").should("be.visible");
    cy.contains("h3", "Complete").should("be.visible");
    cy.get(`.MuiFormControlLabel-root`).should("be.disabled").and("be.checked");
  });

  it('TC-015 - Validated that if the customer selected "No" for the Water Proximity question, the checkbox label "Flood Protection Included" should not have a price indicated.', () => {
    WaterProximityPage.getRadioButton().should("not.be.checked");
    WaterProximityPage.selectProximity("No");
    WaterProximityPage.getNextButton();
    PlansPage.getPlan().should("have.length", 2);
    cy.contains("h3", "Standard").should("be.visible");
    cy.contains("h3", "Complete").should("be.visible");
    cy.get(`.MuiFormControlLabel-root`)
      .invoke("text")
      .should("have.text", "Flood Protection Included");
  });

  it('TC-016 - Validate that if the customer is near a body of water and selected "Yes" for the Water Proximity question, should see "Standard" and "Complete" plan options, and see an enabled, unchecked by default checkbox with the label "Include Flood Protection (+$XX)" within the Complete plan', () => {
    WaterProximityPage.getRadioButton().should("not.be.checked");
    WaterProximityPage.selectProximity("Yes");
    WaterProximityPage.getNextButton();
    PlansPage.getPlan().should("have.length", 2);
    cy.contains("h3", "Standard").should("be.visible");
    cy.contains("h3", "Complete").should("be.visible");
    cy.contains('div[class*="MuiPaper-root"]', "Complete").within(() => {
      cy.get(`.MuiFormControlLabel-root`)
        .should("not.be.disabled")
        .and("not.be.checked")
        .invoke("text")
        .should("match", /Include Flood Protection \(\+\$\d+\)/);
    });
  });
});
