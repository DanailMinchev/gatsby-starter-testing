import React from "react"
import { render } from "@testing-library/react"
import { useStaticQuery } from "gatsby" // mocked

import Image, { PureImage } from "../image"

describe(`Image`, () => {
  beforeEach(() => {
    useStaticQuery.mockImplementationOnce(() => ({
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

  it(`renders an image`, () => {
    const { container } = render(<Image />)

    expect(container.querySelector(`picture`)).toBeInTheDocument()
  })

  describe(`Snapshots`, () => {
    it(`matches snapshot`, () => {
      const { container } = render(<Image />)

      expect(container).toMatchSnapshot()
    })
  })
})

describe(`PureImage`, () => {
  const data = {
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
  }

  it(`renders an image`, () => {
    const { container } = render(<PureImage data={data} />)

    expect(container.querySelector(`picture`)).toBeInTheDocument()
  })

  describe(`Snapshots`, () => {
    it(`matches snapshot`, () => {
      const { container } = render(<PureImage data={data} />)

      expect(container).toMatchSnapshot()
    })
  })
})
