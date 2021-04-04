const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoPrefixPlugin = require("autoprefixer");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin")
  .default;
const WebpackModuleNoModulePlugin = require("@hydrophobefireman/module-nomodule");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { autoPrefixCSS } = require("catom/dist/css");
const babel = require("./.babelconfig");
const uiConfig = require("./ui.config.json");
const mode = process.env.NODE_ENV;
const isProd = mode === "production";

const { outputDir, staticFilePrefix, inlineCSS, enableCatom } = uiConfig;

function prodOrDev(a, b) {
  return isProd ? a : b;
}

function srcPath(subdir) {
  return path.join(__dirname, subdir);
}

const jsLoaderOptions = (isLegacy) => ({
  test: /\.(m?js|tsx?)$/,
  exclude: /(node_modules\/(?!(@hydrophobefireman|statedrive)))|(injectables)/,
  use: {
    loader: "babel-loader",
    options: babel.env[isLegacy ? "legacy" : "modern"],
  },
});
const cssLoaderOptions = {
  test: /\.css$/,
  use: [
    { loader: MiniCssExtractPlugin.loader },
    {
      loader: "css-loader",
    },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: { plugins: [autoPrefixPlugin()] },
      },
    },
  ],
};
const contentLoaderOptions = {
  test: /\.(png|jpg|gif|ico|svg)$/,
  use: uiConfig.preferBase64Images
    ? [{ loader: "url-loader", options: { fallback: "file-loader" } }]
    : [{ loader: "file-loader" }],
};

function getEnvObject(isLegacy) {
  const prod = !isLegacy;
  return {
    arrowFunction: prod,
    const: prod,
    destructuring: prod,
    forOf: prod,
    dynamicImport: prod,
    module: prod,
  };
}
function getCfg(isLegacy) {
  return {
    cache: enableCatom
      ? { type: "memory" }
      : {
          type: "filesystem",
          buildDependencies: {
            config: [__filename],
          },
        },
    devServer: {
      contentBase: `${__dirname}/${outputDir}`,
      compress: true,
      port: 4200,
      historyApiFallback: true,
    },
    module: {
      rules: [
        jsLoaderOptions(isLegacy),
        cssLoaderOptions,
        contentLoaderOptions,
      ],
    },
    entry: `${__dirname}/src/App.tsx`,
    output: {
      environment: getEnvObject(isLegacy),
      path: `${__dirname}/${outputDir}/`,
      filename: `${staticFilePrefix}/${
        isLegacy ? "legacy" : "es6"
      }/[name]-[chunkhash].js`,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
      alias: { "@": srcPath("src") },
    },
    mode,
    optimization: {
      concatenateModules: false,
      minimizer: prodOrDev([new TerserWebpackPlugin({ parallel: true })], []),
      splitChunks: {
        chunks: "all",
      },
      runtimeChunk: "single",
    },
    plugins: [
      new HtmlWebpackPlugin({
        templateParameters: async function templateParametersGenerator(
          compilation,
          files,
          tags,
          options
        ) {
          let css = uiConfig.enableCatom
            ? `<style>
                ${await autoPrefixCSS()}
               </style>
          `
            : "";
          return {
            compilation,
            webpackConfig: compilation.options,
            htmlWebpackPlugin: {
              tags,
              files,
              options: Object.assign(options, {
                css,
              }),
            },
          };
        },
        inject: "body",
        template: `${__dirname}/index.html`,
        xhtml: true,
        favicon: "./favicon.ico",
        minify: prodOrDev(
          {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            html5: true,
            minifyCSS: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeComments: true,
          },
          !1
        ),
      }),
      new MiniCssExtractPlugin({ filename: `${staticFilePrefix}/main.css` }),
      isProd &&
        new OptimizeCSSAssetsPlugin({ cssProcessor: require("cssnano") }),
      isProd && inlineCSS && new HTMLInlineCSSWebpackPlugin({}),
      new WebpackModuleNoModulePlugin(isLegacy ? "legacy" : "modern"),
    ].filter(Boolean),
  };
}

module.exports = isProd ? [getCfg(false), getCfg(true)] : getCfg(false);
