const logger = require("../../helper/logger.js");
const global = browser.globals;

let loginPage = browser.page.loginPage();
let myDashboard = browser.page.Dashboard.dashboardMyDashboard();

describe("My Settings Verification", () => {
  before((browser) => {
    browser.window.maximize().url(global.url);
  }),
    after(async (browser) => {
      browser.quit();
    });

  it("Verify that the elements of LoginPage are visible", async function () {
    await loginPage
      .waitForElementVisible("@header", 5000)
      .assert.titleContains("Sign in to nashtech");
  });

  it("Verify successful login with valid credentials", async function () {
    await loginPage
      .enterNameAndPassword(global.user, global.pass)
      .focusClick("css", "#kc-login", false)
      .assert.urlContains("/my-dashboard");
  });
  it("Verify user should be able to see Welcome text (TC-64)", async function () {
    await myDashboard.assert.textContains("@welcomeText", "Welcome");
  });

  it(" Verify user should be able to see all fields in dashboard page (TC-63)", async function () {
    await browser
      .waitForElementVisible("#sidenav-collapse-main .navbar-nav", 5000)
      .assert.visible(
        "#sidenav-collapse-main .navbar-nav",
        "Left field is Present in the Dashboard Webpage",
      )
      .assert.visible(
        ".mt-3.mb-4.card-heading.d-flex.align-items-center.justify-content-center.fs-4",
        "Your Reward field is present",
      )
      .assert.visible(
        ".mt-3.mb-4.d-flex.align-items-center.justify-content-center",
        "Last Contribution is present",
      )
      .assert.visible(
        ".d-flex.row",
        "Points, Overall Score, Overall Rank field is present",
      )
      .assert.visible(
        ".card.card-heading.me-2.pb-5",
        "Daily Motivation is Present",
      )
      .assert.visible(
        ".ms-3.text-white.mt-4.mb-n4",
        "12 Months Contribution is Present",
      );
  });
  it("Verify user should be able to navigate profile page through Profile picture (TC-65)", async function () {
    await browser
      .focusClick("css", ".material-symbols-outlined.hex", false)
      .assert.textContains(
        "button.edit-detail-button",
        "Update Profile Picture",
        "Update Profile Picture",
      )
      .back();
  });
  it("Verify user should be able Search a Nasher (TC-69)", async function () {
    await browser
      .setValue("#Search", "Sparsh")
      .waitForElementVisible(".text-color.name-text", 5000)
      .assert.visible(".text-color.name-text", "Suggestion are visible");
  });
  it(" Verify user should be able to Change to French Language from dropdown (TC-70)", async function () {
    await browser.focusClick(
      "xpath",
      '//div[@class = "dropdown-list__item" and contains(text(), "French")]',
      false,
    );
    await myDashboard.assert
      .textContains("@welcomeText", "Salut,")
      .assert.visible("@welcomeText", "Change to French");
  });
  it(" Verify user should be able to Change to English Language from dropdown (TC-71)", async function () {
    await browser.focusClick(
      "xpath",
      '//div[@class = "dropdown-list__item" and contains(text(), "English")]',
      false,
    );
    await myDashboard.assert
      .textContains("@welcomeText", "Welcome,")
      .assert.visible("@welcomeText", "Change to English");
  });
  it("Verify user should be able to Change Application view to Light Mode (TC-72)", async function () {
    await browser
      .focusClick(
        "xpath",
        "//div[@class='desktop-header']//i[@class='material-icons user-icon cursor-pointer' and contains(text(),'light_mode')]",
        false,
      )
      .assert.visible(
        ".desktop-header .nav-item:nth-child(3) .user-icon.cursor-pointer",
        "Switch to Lightmode",
      );
  });
  it("Verify user should be able to Change Application view to Darkmode (TC-73)", async function () {
    await browser
      .focusClick(
        "xpath",
        "//div[@class='desktop-header']//i[@class='material-icons user-icon cursor-pointer' and contains(text(),'dark_mode')]",
        false,
      )
      .assert.visible(
        ".desktop-header .nav-item:nth-child(3) .user-icon.cursor-pointer",
        "Switch to dark_mode",
      );
  });
  it("Verify user should be able to see Last Contribution (TC-74)", async function () {
    await browser
      .waitForElementVisible(".text-bolder.lastContributionDay", 5000)
      .assert.visible(
        ".text-bolder.lastContributionDay",
        "User Able to See Last Contribution",
      );
  });
  it(" Verify user should be able to click see all button for Daily motivation tile (TC-80)", async function () {
    await browser.assert
      .visible(".btn.px-3.py-1.all-btn.border-button")
      .focusClick("css", ".btn.px-3.py-1.all-btn.border-button", false);
  });
  it("Verify user should be able to see Contribution on Motivation tile (TC-75)", async function () {
    await browser.assert.visible(".my-dashboard .feeds");
  });
  it("Verify user should be able to Like specific Contribution (TC-76) ", async function () {
    await browser.execute(() => {
      document
        .querySelectorAll(
          "a.icon.mx-1:first-of-type span.material-symbols-outlined.mx-1.align-middle",
        )[0]
        .click();
    });
    const initialLikeCount = await browser.getText(
      ".like-counter.align-middle",
    );
    const initialLikes = parseInt(initialLikeCount);
    const updatedLikeCount = await browser.getText(
      ".like-counter.align-middle",
    );
    const updatedLikes = parseInt(updatedLikeCount);

    logger.info(updatedLikes);
    await browser.assert.visible(".like-counter.align-middle");
  });
  it("Verify user should be able to Dislike specific Contribution (TC-77) - Version1", async function () {
    await browser.execute(() => {
      document
        .querySelectorAll(
          "a.icon.mx-1 span.material-symbols-outlined.mx-1.align-middle.like-dislike-before",
        )[0]
        .click();
    });
    const initialLikeCount = await browser.getText(
      ".like-counter.align-middle",
    );
    const initialLikes = parseInt(initialLikeCount);
    const updatedLikeCount = await browser.getText(
      ".like-counter.align-middle",
    );
    const updatedLikes = parseInt(updatedLikeCount);
    logger.info(updatedLikes);
    await browser.assert.visible(".like-counter.align-middle");
  });
  it("Verify user should be able to send a Comment on specific Contribution (TC-78)", async function () {
    await browser.execute(() => {
      document
        .querySelector("#Layer_2")
        .closest("svg")
        .dispatchEvent(new Event("click", { bubbles: true }));
    });
    await myDashboard.setValue("@myComment", ["Perfect", browser.Keys.ENTER]);
  });
  it("Verify user should be able to Share specific Contribution on social media (TC-79)", async function () {
    await browser
      .execute(() => {
        document.querySelector("#button-basic").click();
      })
      .execute(() => {
        document.querySelector(".sb-wrapper.sb-show-icon.sb-twitter").click();
      });

    await browser.window.getAllHandles(function (result) {
      const originalHandle = result.value[0];
      const handle = result.value[1];
      this.window.switch(handle).assert.urlContains("/twitter.com");
      this.window.switch(originalHandle);
    });
  });
  it("Verify user should be able to navigate Profile page through Settings button (TC-81) ", async function () {
    await browser
      .execute(() => {
        document.querySelectorAll(".material-icons.user-icon")[1].click();
      })
      .focusClick("css", ".d-flex.py-1.mt-1", false)
      .assert.urlContains("/my-profile")
      .back();
  });
  it("Verify user should be able to click on points and redirect to profile page", async function () {
    await browser
      .focusClick("css", "span.all-time-score", false)
      .assert.urlContains("/my-profile")
      .back();
  });
  it("Verify user should be able to click on Overall ranks and redirect to profile page ", async function () {
    await browser
      .execute(() => {
        document
          .evaluate(
            '//div[@class = "score-text text-center mt-n3" and contains(text(), "Overall Rank")]',
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null,
          )
          .singleNodeValue.click();
      })
      .assert.urlContains("/my-profile")
      .back();
  });
  it("Verify user should be able to click on Overall Score and redirect to profile page ", async function () {
    await browser
      .execute(() => {
        document
          .evaluate(
            '//div[@class = "score-text text-center mt-n3" and contains(text(), "Overall Score")]',
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null,
          )
          .singleNodeValue.click();
      })
      .assert.urlContains("/my-profile")
      .back();
  });
});
