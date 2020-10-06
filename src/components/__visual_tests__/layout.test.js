/**
 * Function to remove footer element
 *
 * @param page
 * @returns {Promise<void>}
 */
async function removeFooter(page) {
  await page.evaluate(() => {
    ;(document.querySelectorAll("footer") || []).forEach(element =>
      element.remove()
    )
  })
}

describe(`Layout`, () => {
  const STORYBOOK_HOST = process.env.STORYBOOK_HOST || `localhost`

  it(`renders Basic`, async () => {
    await page.goto(
      `http://${STORYBOOK_HOST}:6006/iframe.html?id=components-layout--basic`
    )
    await page.waitFor(1000)
    // an example how to modify the page: remove <footer>
    await removeFooter(page)
    const image = await page.screenshot({ fullPage: true })

    expect(image).toMatchImageSnapshot({
      failureThreshold: 0.81,
      failureThresholdType: `percent`,
    })
  })
})
