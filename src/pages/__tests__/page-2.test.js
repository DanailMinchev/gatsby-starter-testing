import React from "react"
import { render, screen } from "@testing-library/react"
import { useStaticQuery } from "gatsby" // mocked

import PageTwo from "../page-2"

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

describe(`Page Two`, () => {
  it(`contains Welcome text`, () => {
    render(<PageTwo />)

    const element = screen.getByText(`Welcome to page 2`)
    expect(element).toBeInTheDocument()
  })

  it(`contains links`, () => {
    render(<PageTwo />)

    const homepageLink = screen.getByText(/go back to the homepage/i)
    expect(homepageLink).toBeInTheDocument()
    expect(homepageLink).toHaveAttribute(`href`, `/`)
  })
})
