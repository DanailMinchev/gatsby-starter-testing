module.exports = {
  launch: {
    headless: true,
    args: [
      `--no-sandbox`, // see https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#setting-up-chrome-linux-sandbox
      `--disable-setuid-sandbox`,
      `--font-render-hinting=none`, // see https://github.com/puppeteer/puppeteer/issues/2410
    ],
  },
}
