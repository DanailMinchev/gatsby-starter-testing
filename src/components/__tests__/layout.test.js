import React from "react"
import { render, screen } from "@testing-library/react"
import { useStaticQuery } from "gatsby" // mocked

import Layout, { PureLayout } from "../layout"

describe(`Layout`, () => {
  beforeEach(() => {
    useStaticQuery.mockImplementationOnce(() => ({
      site: {
        siteMetadata: {
          title: "Gatsby Testing Starter",
        },
      },
    }))
  })

  it(`renders a header`, () => {
    const { container } = render(
      <Layout>
        <main>
          <h1>Hello World</h1>
        </main>
      </Layout>
    )

    expect(container.querySelector(`header`)).toBeInTheDocument()
  })

  it(`renders children`, () => {
    const text = `Hello World`
    render(
      <Layout>
        <main>
          <h1>{text}</h1>
        </main>
      </Layout>
    )

    const child = screen.getByText(text)
    expect(child).toBeInTheDocument()
  })

  describe(`Snapshots`, () => {
    it(`matches snapshot`, () => {
      const dateMock = new Date("2020-06-22T14:45:46.773Z")
      const dateSpy = jest
        .spyOn(global.Date.prototype, "getFullYear")
        .mockImplementationOnce(() => dateMock.getFullYear())

      const { container } = render(
        <Layout>
          <main>
            <h1>Hello World</h1>
          </main>
        </Layout>
      )

      expect(dateSpy).toHaveBeenCalled()
      expect(container).toMatchSnapshot()

      dateSpy.mockRestore()
    })
  })
})

describe(`PureLayout`, () => {
  const data = {
    site: {
      siteMetadata: {
        title: "Gatsby Testing Starter",
      },
    },
  }

  it(`renders a header`, () => {
    const { container } = render(
      <PureLayout data={data}>
        <main>
          <h1>Hello World</h1>
        </main>
      </PureLayout>
    )

    expect(container.querySelector(`header`)).toBeInTheDocument()
  })

  it(`renders children`, () => {
    const text = `Hello World`
    render(
      <PureLayout data={data}>
        <main>
          <h1>{text}</h1>
        </main>
      </PureLayout>
    )

    const child = screen.getByText(text)
    expect(child).toBeInTheDocument()
  })

  describe(`Snapshots`, () => {
    it(`matches snapshot`, () => {
      const dateMock = new Date("2020-06-22T14:45:46.773Z")
      const dateSpy = jest
        .spyOn(global.Date.prototype, "getFullYear")
        .mockImplementationOnce(() => dateMock.getFullYear())

      const { container } = render(
        <PureLayout data={data}>
          <main>
            <h1>Hello World</h1>
          </main>
        </PureLayout>
      )

      expect(dateSpy).toHaveBeenCalled()
      expect(container).toMatchSnapshot()

      dateSpy.mockRestore()
    })
  })
})
