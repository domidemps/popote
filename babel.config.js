module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      [
        "@babel/env",
        {
          useBuiltIns: "entry",
          loose: true,
          corejs: "3",
          targets: {
            browsers: ["last 2 versions", "not ie < 11"]
          }
        }
      ],
      "@babel/preset-react"
    ],
    plugins: [
      "@babel/plugin-syntax-jsx",
      "@babel/transform-runtime",
      "@babel/syntax-dynamic-import",
      ["@babel/proposal-class-properties", { loose: true }],
      [
        "module-resolver",
        {
          root: ["./frontend/**"]
        }
      ]
    ]
  };
};
