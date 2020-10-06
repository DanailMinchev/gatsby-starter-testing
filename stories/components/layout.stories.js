import React from "react"

import { PureLayout } from "../../src/components/layout"

export default {
  title: "Components/Layout",
  component: PureLayout,
}

const Template = args => <PureLayout {...args} />

export const Basic = Template.bind({})
Basic.args = {
  data: {
    site: {
      siteMetadata: {
        title: "Gatsby Testing Starter",
      },
    },
  },
  children: (
    <main>
      <h1>Hello World</h1>
    </main>
  ),
}
