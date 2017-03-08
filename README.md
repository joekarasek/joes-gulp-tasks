# joes-gulp-tasks - An Accessible Gulp 4 Package 

## Description
Writing your own gulp pipelines isn't always easy. Wouldn't be nice to automate all your front-end develop tasks with a straight forward configuration file? Gulp task management that is flexible, but accessible. This package is an attempt to bring powerful gulp tasks to any project, quickly and hopefully painlessly.
 
## Features

Here are some of the features this package includes:

* BrowserSync - This tool is great for development! Serve your site locally, and keep pace with code changes without have to refresh!
* Sass/Scss Compiling - A collection of tools to glob, compile, add browser compatibility, and compress your stylesheets
* Javascript Compiling - Babel lets you write the Javascript you want, including ES6. Uglify? Minify? No problem!
* HTML Templates - Twig.js is a great Javascript implementation of Twig, a powerful but easy to use templating language that brings sanity to your html.
* Lint/Validation - Lint your stylesheets, javascript, and html again a wide range of style guides.

## Requirements

* [Node.js](https://nodejs.org/)
* [npm](https://www.npmjs.com/)

## Getting Started/Installation

### Core setup 

1. Install the package using npm.

```
npm install joe-gulp-tasks --save-dev
```

2. Create a file called gulpfile.js

```javascript
function hello() {
    "world";
}
```

3. Create a file called gulpconfig.js

```javascript
module.exports = {
  browserSync: {
    enabled: true,
    port: 3050,
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
      'src/scss/**/*.scss',
    ],
    includePaths: [
      '/src/vendor/**/*.scss',
    ],
    dest: 'build/css/',
    lint: true,
    // outputStyles maybe 'expanded', 'compressed', 'nested'
    outputStyle: 'expanded',
    sourceMap: false,
    sourceComments: false,
    autoPrefixerBrowsers: [
      'last 2 versions',
      'IE >= 10',
    ],
    flattenOutput: true,
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
    sourceMap: false,
    includePaths: [
      'src/canvas/js/**/*.js',
    ],
    eslint: {
      enabled: true,
      sources: [
        'src/js/**/*.js',
        'gulpfile.js',
      ],
    },
    documentationJs: {
      enabled: true,
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
    sources: [
      'src/index.twig',
      'src/stylesheet.twig',
      'src/about.twig',
    ],
    dest: 'build/',
    lint: true,
    twig: {
      enabled: true,
      baseDir: 'src/templates'
    },
  },
  assets: {
    pipelines: [
      {
        source: 'src/',
        dest: '',
      }
    ],
  }
};
```

### Linting


## Usage

Compile resources, open site and documentation, start watches:
```
npm start
```

Compile all resources including scss:
```
npm run compile
```

Build production version of site:
```
npm run build
```

## Canvas Documentation

Canvas is an additional html framework the client has asked us to use. It includes several javascript libraries (Flex Slider, Owl Carousel, etc). Documentation can be found [here](http://canvasdoc.bfdig.com/).

## Sass/Scss and Sass Documentation

Sass/Scss documentation is handled by Sassdoc. See [sassdoc](http://sassdoc.com/) docs at `./sassdoc` (at http://localhost:3002/sassdoc after `npm start`)

Add more sassdoc annotations like `/// @param` by seeing [docs here](http://sassdoc.com/annotations).

Build Sassdocs:
```
npm run compile:sassdoc
```

## JS and JS Documentation

Javascript documentation is handled by DocumentationJS. See [documenationJS](http://documentation.js.org/) docs at `./jsdoc` (at http://localhost:3002/jsdoc after `npm start`)

Add more jsdoc annotations like `/** @param */` by seeing [docs here](https://github.com/documentationjs/documentation/blob/master/docs/GETTING_STARTED.md).

Build JSdocs:
```
npm run build:jsdoc
```


## Deployment to Webfaction

These sites are hosted through [Webfaction](https://www.webfaction.com/) with DNS handled by [Name Cheap](https://www.namecheap.com/).

The deployment scripts are not currently complete, but will take care of configuring the webfaction server for you.
```
npm run deploy
```
_*Note:*Deployment requires `./siteConfig.py`. See `./example.siteConfig.py` for instructions on setting up this file._

To finish deployment:
1. Ssh into the webfaction server as dan linn
2. `cd webapps/projectName_app`
3. Clone the project with *this directory as the root* (`git clone url .`) 
4. `npm install`
5. `npm run build`

## DNS through Name Cheap

DNS for this project is handled through [Name Cheap](https://www.namecheap.com/)

1. Log into Name Cheap as Dan Linn
2. Domains > hwdevs.site > "Manage"
3. Advanced DNS > "Add new record"
	- Type: A Record
	- Host: site name (the last name of the doctor, lowercase)
	- Value: 198.58.114.22
	- TTL: automatic

*Note:* It may take up to 24 hours for DNS to propogate and for the site to go live.

## Troubleshooting

Delete `node_modules` and re-install:
```
rm -rf node_modules
npm install
```
