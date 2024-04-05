const logger = require("../../helper/logger.js");
const global = browser.globals;

let loginPage = browser.page.loginPage();
let dashboardMyActivity = browser.page.Dashboard.dashboardMyActivity();
let certificationPoints;

describe("My Activity Verification", () => {
  before((browser) => {
    browser.window.maximize().url(global.url);
  }),
    after(async (browser) => {
      browser.end();
    });

  it("Verify that the elements of LoginPage are visible", function () {
    loginPage
      .waitForElementVisible("@header", 5000)
      .assert.titleContains("Sign in to nashtech");
  });

  it("Verify successful login with valid credentials", async function () {
    await loginPage
      .enterNameAndPassword(global.user, global.pass)
      .focusClick("css", "#kc-login", false)
      .assert.urlContains("/my-dashboard");
  });

  it("Verify user should be able to see all the activities on the My activity - Version1", async function () {
    dashboardMyActivity.waitForElementVisible("body", 5000); // it will redirect me to my Activity Page
    await browser
      .execute(
        'document.querySelector(".material-symbols-outlined.hex").click();',
      )
      .assert.visible(".card.tab-card.py-5.px-4", "All activities is Visible");
  });
  it("Extract text from all elements within the g-sidenav-show class", async function () {
    dashboardMyActivity
      .waitForElementVisible("@scoringBtn", 5000)
      .focusClick("css", ".nav-link.pe-0.text-white.font-weight-bolder", false)
      .useXpath()
      .getText("@advanceCertificate", function (result) {
        certificationPoints = result.value;
        logger.info(certificationPoints); // logging the points
        browser.focusClick(
          "css",
          ".ms-1.font-weight-bolder.go1up-logo.fs-3.cursor-pointer",
          false,
        );
        browser.focusClick("css", ".material-symbols-outlined.hex", false);
      });
  });
  it("Verify that the user can able to see the time the activity was done on all Activity. - Version1", function () {
    dashboardMyActivity
      .waitForElementVisible("@timeLine")
      .assert.elementPresent(
        "@timeLine",
        "Time line is visible for every activity",
      );
  });
  it("Verify user should see Add a contribution button when no contribution has been added by the user - Version1", function () {
    browser.execute(() => {
      document
        .querySelectorAll(".nav-item.my-1.cursor-pointer.text-bold.p-2")[2]
        .click();
    });
    dashboardMyActivity.assert.visible(
      "@addContributionBtn",
      "Add a contribution button is Visible",
    );
  });
});
