import React from "react"
import { render, screen } from "@testing-library/react"
import { useStaticQuery } from "gatsby" // mocked

import Index from "../index"

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

describe(`Index`, () => {
  it(`contains a greeting`, () => {
    render(<Index />)

    const greeting = screen.getByText(`Hi people`)
    expect(greeting).toBeInTheDocument()
  })

  it(`contains links`, () => {
    render(<Index />)

    const pageTwoLink = screen.getByText(/go to page 2/i)
    expect(pageTwoLink).toBeInTheDocument()
    expect(pageTwoLink).toHaveAttribute(`href`, `/page-2/`)

    const usingTypeScriptLink = screen.getByText(/go to "using typescript"/i)
    expect(usingTypeScriptLink).toBeInTheDocument()
    expect(usingTypeScriptLink).toHaveAttribute(`href`, `/using-typescript/`)
  })
})
