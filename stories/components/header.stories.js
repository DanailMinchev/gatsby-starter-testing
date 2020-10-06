import React from "react"

import Header from "../../src/components/header"

export default {
  title: "Components/Header",
  component: Header,
}

const Template = args => <Header {...args} />

export const Basic = Template.bind({})

export const WithSiteTitle = Template.bind({})
WithSiteTitle.args = {
  siteTitle: `Site Title here ...`,
}
