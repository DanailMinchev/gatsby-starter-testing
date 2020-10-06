module.exports = {
  transform: {
    "^.+\\.[jt]sx?$": `<rootDir>/jest-preprocess.js`,
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
  },
  testPathIgnorePatterns: [
    `node_modules`,
    `\\.cache`,
    `<rootDir>/public`,
    `<rootDir>/cypress`,
    `\\.storybook`,
    `<rootDir>/stories`,
    `<rootDir>/storybook-static`,
    `__visual_tests__`,
  ],
  coveragePathIgnorePatterns: [
    `node_modules`,
    `\\.cache`,
    `<rootDir>/public`,
    `<rootDir>/cypress`,
    `\\.storybook`,
    `<rootDir>/stories`,
    `<rootDir>/storybook-static`,
    `__visual_tests__`,
  ],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
  setupFilesAfterEnv: [`<rootDir>/jest.setup.js`],
  setupFiles: [`<rootDir>/jest-loadershim.js`],
}
