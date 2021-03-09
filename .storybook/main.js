module.exports = {
  stories: ["../stories/**/*.stories.js", "../stories/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-storysource",
  ],
  webpackFinal: async config => {
    // If you are using Yarn Workspaces and nesting the packages,
    // you need to include the parent package where gatsby is located
    // see https://github.com/gatsbyjs/gatsby/issues/10668#issuecomment-648743019
    await new Promise((resolve, reject) => {
      const gatsbyBinPath = require("path").resolve(
        "./node_modules/.bin/gatsby"
      )
      require("fs").lstat(gatsbyBinPath, (err, stats) => {
        if (stats.isSymbolicLink()) {
          if (err) {
            reject(err)
          } else {
            const gatsbyResolvedLink = require("fs").readlinkSync(gatsbyBinPath)
            if (gatsbyResolvedLink !== "../gatsby/cli.js") {
              config.module.rules[0].include = require("path").resolve(
                gatsbyResolvedLink.replace("/../node_modules/gatsby/cli.js", "")
              )
            }
          }
        }
        resolve()
      })
    })

    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]

    // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
    config.module.rules[0].use[0].loader = require.resolve("babel-loader")

    // use @babel/preset-react for JSX and env (instead of staged presets)
    config.module.rules[0].use[0].options.presets = [
      require.resolve("@babel/preset-react"),
      require.resolve("@babel/preset-env"),
    ]

    config.module.rules[0].use[0].options.plugins = [
      // use @babel/plugin-proposal-class-properties for class arrow functions
      require.resolve("@babel/plugin-proposal-class-properties"),
      // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
      require.resolve("babel-plugin-remove-graphql-queries"),
    ]

    // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
    config.resolve.mainFields = ["browser", "module", "main"]

    // TypeScript support
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [["react-app", { flow: false, typescript: true }]],
        plugins: [
          require.resolve("@babel/plugin-proposal-class-properties"),
          // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
          require.resolve("babel-plugin-remove-graphql-queries"),
        ],
      },
    })
    config.resolve.extensions.push(".ts", ".tsx")

    return config
  },
}
