import React from "react"
import { render, waitFor } from "@testing-library/react"
import { useStaticQuery } from "gatsby" // mocked

import SEO, { PureSEO } from "../seo"

describe(`SEO`, () => {
  beforeEach(() => {
    useStaticQuery.mockImplementationOnce(() => ({
      site: {
        siteMetadata: {
          title: "Gatsby Testing Starter",
          description: "A simple starter with configured testing",
          author: "@DanailMinchev",
        },
      },
    }))
  })

  it(`renders title`, async () => {
    const title = `Hello World`

    render(<SEO title={title} />)

    await waitFor(() =>
      expect(document.title).toEqual(`${title} | Gatsby Testing Starter`)
    )
  })

  it(`renders lang attribute`, async () => {
    const title = `Hello World`
    const lang = `ru`

    render(<SEO title={title} lang={lang} />)

    await waitFor(() =>
      expect(document.querySelector(`html`)).toHaveAttribute(`lang`, lang)
    )
  })

  it(`renders meta tags`, async () => {
    const description = `Description here ...`
    const lang = `bg`
    const meta = [
      {
        name: `name_here`,
        content: `content here ...`,
      },
      {
        property: `property:here`,
        content: `content here ...`,
      },
    ]
    const title = `Title here ...`

    render(
      <SEO description={description} lang={lang} meta={meta} title={title} />
    )

    await waitFor(() => {
      expect(document.querySelectorAll(`meta`)).toHaveLength(10)
    })
    expect(document.querySelector("head")).toMatchSnapshot()
  })

  it(`renders meta tags with defaults`, async () => {
    const title = `Hello World`

    render(<SEO title={title} />)

    await waitFor(() => {
      expect(document.querySelectorAll(`meta`)).toHaveLength(8)
    })
    expect(document.querySelector("head")).toMatchSnapshot()
  })
})

describe(`PureSEO`, () => {
  const data = {
    site: {
      siteMetadata: {
        title: "Gatsby Testing Starter",
        description: "A simple starter with configured testing",
        author: "@DanailMinchev",
      },
    },
  }

  it(`renders title`, async () => {
    const title = `Hello World`

    render(<PureSEO data={data} title={title} />)

    await waitFor(() =>
      expect(document.title).toEqual(`${title} | Gatsby Testing Starter`)
    )
  })

  it(`renders lang attribute`, async () => {
    const title = `Hello World`
    const lang = `ru`

    render(<PureSEO data={data} title={title} lang={lang} />)

    await waitFor(() =>
      expect(document.querySelector(`html`)).toHaveAttribute(`lang`, lang)
    )
  })

  it(`renders meta tags`, async () => {
    const description = `Description here ...`
    const lang = `bg`
    const meta = [
      {
        name: `name_here`,
        content: `content here ...`,
      },
      {
        property: `property:here`,
        content: `content here ...`,
      },
    ]
    const title = `Title here ...`

    render(
      <PureSEO
        data={data}
        description={description}
        lang={lang}
        meta={meta}
        title={title}
      />
    )

    await waitFor(() => {
      expect(document.querySelectorAll(`meta`)).toHaveLength(10)
    })
    expect(document.querySelector("head")).toMatchSnapshot()
  })

  it(`renders meta tags with defaults`, async () => {
    const title = `Hello World`

    render(<PureSEO data={data} title={title} />)

    await waitFor(() => {
      expect(document.querySelectorAll(`meta`)).toHaveLength(8)
    })
    expect(document.querySelector("head")).toMatchSnapshot()
  })
})
