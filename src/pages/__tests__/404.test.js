import React from "react"
import { render, screen } from "@testing-library/react"
import { useStaticQuery } from "gatsby" // mocked

import FourOFour from "../404"

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

describe(`404`, () => {
  it(`contains NOT FOUND text`, () => {
    render(<FourOFour />)

    const element = screen.getByText(`NOT FOUND`)
    expect(element).toBeInTheDocument()
  })
})
