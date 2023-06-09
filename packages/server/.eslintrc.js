module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard-with-typescript", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["tsconfig.json"],
  },
  ignorePatterns: ["**/dist/*", "**/node_modules/*", "**/__tests__/*"],
  rules: {},
};
