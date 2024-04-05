const elements = {
  badges: "h6.badge-text",
  badgesCount: ".material-symbols-outlined.hexagon.cursor-pointer",
  badgesMonth: "div.info-div .mb-n1",
  badgesRank: ".font-weight-light.overall-txt-color.rankSize",
  badgesScore: "span.score-size",
  points: "h4.mt-2",
  testEmp: {
    selector: "//h3[text()='Test Employee']",
    locateStrategy: "xpath",
  },
  testStu: "span.studio",
  viewBadges:
    ".d-flex.justify-content-start.align-items-center.no-scroll-badges",
};

module.exports = {
  elements: elements,
};
