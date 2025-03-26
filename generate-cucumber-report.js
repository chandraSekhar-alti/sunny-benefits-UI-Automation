const report = require('multiple-cucumber-html-reporter');
const fs = require('fs-extra');
const path = require('path');

function generateReport() {
  const today = new Date();
  const date = today.toISOString().split('T')[0];
  const time = today.toTimeString().split(' ')[0].replace(/:/g, '-');

  const reportDir = path.join(__dirname, 'reports', date, time);

  fs.ensureDirSync(reportDir);

  report.generate({
    jsonDir: './.tmp/json',
    reportPath: reportDir,
    metadata: {
      browser: {
        name: 'chrome',
        version: 'latest'
      },
      device: 'Local Machine',
      platform: {
        name: 'Windows',
        version: '10'
      }
    },
    customData: {
      title: 'Run Info',
      data: [
        { label: 'Project', value: 'Sunny Rewards Automation' },
        { label: 'Release', value: '1.0.0' },
        { label: 'Execution Start Time', value: today.toLocaleString() }
      ]
    }
  });

  console.log(`✅ Report generated at: ${reportDir}`);
}

module.exports = generateReport;
