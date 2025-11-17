import nextConfig from "eslint-config-next";

const config = [
  ...nextConfig,
  {
    rules: {
      // Disable overly strict React 19 purity rules for event handlers
      "react-hooks/purity": "off",
    },
  },
];

export default config;
