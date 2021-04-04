const plugins = [
  "catom/babelPlugin",
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-syntax-dynamic-import",

  [
    "@babel/plugin-transform-react-jsx",
    {
      throwIfNamespace: true,
      runtime: "automatic",
      importSource: "@hydrophobefireman/ui-lib",
    },
  ],
];
const tsPreset = "@babel/preset-typescript";
module.exports = {
  env: {
    modern: {
      presets: [tsPreset, "@babel/preset-modules"],
      plugins,
    },
    legacy: {
      presets: [
        tsPreset,
        [
          "@babel/preset-env",
          {
            corejs: 3,
            targets: ["last 2 versions", "not IE 11"],
            useBuiltIns: "usage",
          },
        ],
      ],
      plugins: [...plugins, ["@babel/plugin-transform-runtime", { corejs: 3 }]],
    },
  },
};
