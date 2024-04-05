const elements = {
  addContribute: ".btn.btn-primary.addRewardBtn.px-2.mt-n1",
  addContributionBtn: ".btn.btn-primary",
  advanceCertificate: {
    selector:
      "//table/tbody/tr[td[1][contains(text(), 'Advanced Certification')]]/td[2]",
    locateStrategy: "xpath",
  },
  myActivityVerify: ".card.tab-card.py-5.px-4",
  scoringBtn: ".nav-link.pe-0.text-white.font-weight-bolder",
  something: '[class="material-icons user-icon"]',
  timeLine: "div.timeline.w-100.mx-1",
};

module.exports = {
  elements: elements,
};
