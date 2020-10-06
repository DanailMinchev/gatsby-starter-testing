describe(`Header`, () => {
  const STORYBOOK_HOST = process.env.STORYBOOK_HOST || `localhost`

  it(`renders Basic`, async () => {
    await page.goto(
      `http://${STORYBOOK_HOST}:6006/iframe.html?id=components-header--basic`
    )
    await page.waitFor(1000)
    const image = await page.screenshot({ fullPage: true })

    expect(image).toMatchImageSnapshot()
  })

  it(`renders With Site Title`, async () => {
    await page.goto(
      `http://${STORYBOOK_HOST}:6006/iframe.html?id=components-header--with-site-title`
    )
    await page.waitFor(1000)
    const image = await page.screenshot({ fullPage: true })

    expect(image).toMatchImageSnapshot({
      failureThreshold: 0.01,
      failureThresholdType: `percent`,
    })
  })
})
