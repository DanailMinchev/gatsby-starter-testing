import React from "react"
import { render, screen } from "@testing-library/react"
import { useStaticQuery } from "gatsby" // mocked

import UsingTypescript from "../using-typescript"

beforeEach(() => {
  useStaticQuery
    .mockImplementationOnce(() => ({
      site: {
        siteMetadata: {
          title: "Gatsby Testing Starter",
        },
      },
    }))
    .mockImplementationOnce(() => ({
      site: {
        siteMetadata: {
          title: "Gatsby Testing Starter",
          description: "A simple starter with configured testing",
          author: "@DanailMinchev",
        },
      },
    }))
})

describe(`Using Typescript`, () => {
  it(`contains TypeScript text`, () => {
    const data = {
      site: {
        buildTime: "2020-05-30 02:45 pm UTC",
      },
    }
    render(<UsingTypescript data={data} path={`some-path`} />)

    const element = screen.getByText(`Gatsby supports TypeScript by default!`)
    expect(element).toBeInTheDocument()
  })

  it(`contains links`, () => {
    const data = {
      site: {
        buildTime: "2020-05-30 02:45 pm UTC",
      },
    }
    render(<UsingTypescript data={data} path={`some-path`} />)

    const typeScriptLink = screen.getByText(/documentation about typescript/i)
    expect(typeScriptLink).toBeInTheDocument()
    expect(typeScriptLink).toHaveAttribute(
      `href`,
      `https://www.gatsbyjs.com/docs/typescript/`
    )

    const homepageLink = screen.getByText(/go back to the homepage/i)
    expect(homepageLink).toBeInTheDocument()
    expect(homepageLink).toHaveAttribute(`href`, `/`)
  })
})
