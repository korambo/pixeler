const path = require('path');
const custom = require('../webpack.config.js');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/objects/**/*.stories.ts",
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: (config) => {
    return {
      ...config,
      resolve: { ...config.resolve, plugins: [...config.resolve.plugins, ...custom.resolve.plugins]  },
      module: {
        ...config.module,
        rules: [
          {
            test: /\.(png|svg)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  encoding: 'base64',
                },
              },
            ],
          },
          ...config.module.rules.filter(({ test }) => !test.toString().match('svg')),
        ]
      }
    };
  },
}
