const common =  `
--require features/steps
--require cucumber.conf.js
--format json:reports/report.json 
`;

module.exports = { default: common };
