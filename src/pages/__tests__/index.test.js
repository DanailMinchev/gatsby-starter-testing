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
    .mockImplementationOnce(() => ({
      placeholderImage: {
        childImageSharp: {
          fluid: {
            base64: "data:image/png;base64,pretend-i-am-a-base64-encoded-image",
            aspectRatio: 1,
            src: "/static/some-path/gatsby-astronaut.png",
            srcSet:
              "/static/some-path1/gatsby-astronaut.png 75w,\n/static/some-path2/gatsby-astronaut.png 150w,\n/static/some-path3/gatsby-astronaut.png 300w,\n/static/some-path4/gatsby-astronaut.png 450w,\n/static/some-path5/gatsby-astronaut.png 600w,\n/static/some-path6/gatsby-astronaut.png 800w",
            sizes: "(max-width: 300px) 100vw, 300px",
          },
        },
      },
    }))
})

describe(`Index`, () => {
  it(`contains a gatsby image`, () => {
    render(<Index />)

    const element = screen.getByTestId(`gatsby-logo`)
    expect(element.querySelectorAll(`picture`)).toHaveLength(1)
  })

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
