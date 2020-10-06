const jestConfig = require(`./jest.config`)

const testMatch = `**/__visual_tests__/**/*.[jt]s?(x)`

module.exports = {
  ...jestConfig,
  testPathIgnorePatterns: jestConfig.testPathIgnorePatterns.filter(
    path => path === testMatch
  ),
  testMatch: [testMatch],
  preset: `jest-puppeteer`,
}
