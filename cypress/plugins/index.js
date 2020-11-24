const { addMatchImageSnapshotPlugin } = require("cypress-image-snapshot/plugin")

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on("before:browser:launch", (browser, launchOptions) => {
    if (browser.name === "chrome") {
      launchOptions.args.push("--start-fullscreen")

      launchOptions.args.push("--window-size=1280,720")
      launchOptions.args.push("--force-device-scale-factor=1")

      launchOptions.args.push("--font-render-hinting=none")

      launchOptions.args.push("--incognito")
    } else if (browser.name === "electron") {
      launchOptions.preferences.fullscreen = true

      launchOptions.preferences.width = 1280
      launchOptions.preferences.height = 720
    } else if (browser.name === "firefox") {
      launchOptions.args.push("--width=1280")
      launchOptions.args.push("--height=720")
    }

    return launchOptions
  })

  addMatchImageSnapshotPlugin(on, config)
}
