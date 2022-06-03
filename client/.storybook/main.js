const path = require("path");

module.exports = {
  stories: ["../src/components/UI/**/*.stories.js"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-links/register",
    "@storybook/addon-essentials/register",
    "@storybook/addon-controls/register",
    "storybook-addon-material-ui/register",
  ],
};
