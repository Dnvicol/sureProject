import { BuildingMaterialPage } from "../POM/buildingMaterial.page";

describe("Story 3: Customer can select which type of building material my home is constructed with.", () => {
  beforeEach(() => {
    cy.visit("/building-material");
  });

  it("TC-010 - Validate that if the customer selects any building material option available it will be directed to the Water Proximity question page.", () => {
    const materials = ["Straw", "Sticks", "Bricks"];
    cy.get(".MuiFormControlLabel-root").should("have.length", materials.length);
    materials.forEach((items, k) => {
      cy.get(".MuiFormControlLabel-root")
        .eq(k)
        .within(() => {
          cy.contains('[class*="MuiFormControlLabel-label"]', items);
          BuildingMaterialPage.getRadioButton().should("not.be.checked");
        });
    });
    BuildingMaterialPage.selectStraw().should("be.checked");
    BuildingMaterialPage.getNextButton();
    cy.url().should("contains", "/water-proximity");
  });

  it("TC-011 - Validate that if the customer does not make any selection of building material, the “Next” button is disabled", () => {
    BuildingMaterialPage.getRadioButton().should("not.be.checked");
    BuildingMaterialPage.getNextButton();
    cy.url().should("contains", "/building-material");
  });
});
