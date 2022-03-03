module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true //额外支持新的 ES6 全局变量
  },
  globals: {
    GC: true
  },
  plugins: ['prettier'],
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  rules: {
    "prettier/prettier":"error",  
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-useless-escape": "off"
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 6 //支持 ES6 语法
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ]
};
