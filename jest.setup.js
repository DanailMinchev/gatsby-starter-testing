require(`@testing-library/jest-dom/extend-expect`)

const { toMatchImageSnapshot } = require(`jest-image-snapshot`)
expect.extend({ toMatchImageSnapshot })
