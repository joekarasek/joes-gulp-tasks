module.exports = {
  browserSync: {
    enabled: true,
    port: 3030,
    watchFiles: [],
    baseDir: 'build/',
    startPath: '/',
    openBrowserAtStart: true,
    // requires above to be true; allows non-default browser to open
    browser: [
      'Google Chrome',
    ],
    reloadDelay: 50,
    reloadDebounce: 750,
  },
  css: {
    enabled: true,
    source: [
      'src/scss/styles.scss',
    ],
    includePaths: [],
    dest: 'build/css/',
    watchPaths: [
      'src/scss/**/*.scss'
    ],
    // Lint css using .stylelintrc.js settings
    lint: true,
    // outputStyles maybe 'expanded', 'compressed', 'nested'
    outputStyle: 'expanded',
    sourceMapEmbed: true,
    sourceComments: false,
    autoPrefixerBrowsers: [
      'last 2 versions',
      'IE >= 10',
    ],
    flattenOutput: false,
    sassdoc: {
      enabled: true,
      dest: 'sassdoc',
      verbose: false,
      exclude: [],
    },
  },
  js: {
    enabled: true,
    source: 'src/js/*.js',
    dest: 'build/js/',
    destFileName: 'scripts.js',
    babel: false,
    uglify: false,
    sourceMapEmbed: true,
    includePaths: [],
    // Lint javascript using .eslintrc.js settings
    eslint: {
      enabled: true,
      sources: [
        'src/js/**/*.js',
      ],
    },
    // Generate documentation from inline js comments using /** ... */  Note: This package can take a long time to compile
    documentationJs: {
      enabled: false,
      sources: [
        'src/js/**/*.js',
      ],
      dest: 'jsdoc',
      // Either 'html', 'md', or 'json'
      format: 'html',
    },
  },
  html: {
    enabled: true,
    // Source html files. If using Twig.js, these will be .twig files
    sources: [
      'src/index.html',
    ],
    dest: 'build/',
    // Html Validator
    lint: true,
    // Twig.js, Javascript implementation of Twig
    twig: {
      enabled: false,
      // Directory of pratials
      baseDir: 'src/templates/',
    },
  },
  assets: {
    //clean pipe, no compiling, use this move images and other static content from src to build
    enabled: true,
    sources: [
      'src/assets/**/*.*',
    ],
    dest: 'build/assets/',
  }
};