module.exports = {
  default: {
    paths: ["features/**/*.feature"],
    require: ["support/**/*.js", "step-definitions/**/*.steps.js"],
    format: ["progress-bar", "html:reports/cucumber-report.html"],
    formatOptions: { snippetInterface: "async-await" },
    parallel: 2,
  },
};
