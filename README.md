# joes-gulp-tasks - An Accessible Gulp 4 Package 


## Description
Writing your own gulp pipelines isn't always easy. Wouldn't be nice to automate all your front-end develop tasks with a straight forward configuration file? Gulp task management that is flexible, but accessible. This package is an attempt to bring powerful gulp tasks to any project, quickly and hopefully painlessly.
 
This module is currently under active development. If you would like to contribute, feel free to open issues and create pull requests on [GitHub](https://github.com/joekarasek/joes-gulp-tasks). Thanks!

More coming soon... 

## Requirements

* [Node.js](https://nodejs.org/)
* [npm](https://www.npmjs.com/)
* [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

Note: If you have previously install gulp using `npm install --global gulp`, you will need to uninstall and install the Gulp Cli. See [GulpJs](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) for more information.

## Getting Started/Installation

0. Install gulp 4 - `npm install gulpjs/gulp.git#4.0 --save-dev`

1. Install Joe's Gulp Tasks - `npm install joe-gulp-tasks --save-dev`

2. Open the newly created `./gulpconfig.js` file and set the configurations to match the directory structure of your project. Toggle the settings as you see fit.

3. `gulp`

4. Enjoy!

Installation will add the following files to your root directory (but not override them if they are already there).

* gulpfile.js - This is the main file that Gulp will use. Add custom tasks here.
* gulpconfig.js - Set this up config file up. Tell Joe's Gulp Tasks what to do, where to find things, and where to put them.
* .eslintrc.js - Linting configuration for eslint (Javascript). Default is set to the airBnB styleguide.
* .stylelintrc.js - Linting configuration for stylelint (Css). Default is set to the airBnB styleguide.

## Usage

```
gulp
```

This will start browserSync, do a single compile, and start your watches. Happy coding!

### More Usage

This package will auto-generate a number of tasks based on the setup of your `./gulpconfig.js`. These tasks are categorized as either 'clean', 'compile', 'validate', 'watch', or 'default'. All currently active tasks within a category can be run using `gulp masterTaskName`, for example...

Run all clean tasks
```
gulp clean
```

...or...

Run all compile tasks
```
gulp compile
```

To list out all current tasks and to view their relations, simply run...

```
gulp --tasks
```

## Features

Here are some of the features this package includes:

* BrowserSync - This tool is great for development! Serve your site locally, and keep pace with code changes without have to refresh!
* Sass/Scss Compiling - A collection of tools to glob, compile, add browser compatibility, and compress your stylesheets
* Javascript Compiling - Babel lets you write the Javascript you want, including ES6. Uglify? Minify? No problem!
* HTML Templates - Twig.js is a great Javascript implementation of Twig, a powerful but easy to use templating language that brings sanity to your html. Fans of Drupal 8 rejoice!
* Lint/Validation - Lint your stylesheets, javascript, and html again a wide range of style guides.
* SassDoc/DocumentationJS - Good code is commented. Reward good code with beautifully rendered documentation. Impress your team, your client, and your boss.

### Linting

This package will auto-generate (if they are not already present) two files with default configurations for linting.

#### EsLint

Configuration for linting javascript can be found in the `.eslintrc.js` file. This package comes with a default `.eslintrc.js` file configured to use the [airBnB's javascript styleguide](https://github.com/airbnb/javascript).

#### StyleLint

Configuration for linting css/scss/sass can be found in the `.stylelintrc.js` file. This package also comes with a default `.stylelintrc.js` file configured to use the [airBnB's css styleguide](https://github.com/airbnb/css).

### Sass/Scss and Sass Documentation

Sass/Scss documentation is handled by Sassdoc. See [sassdoc](http://sassdoc.com/) docs at `./sassdoc` (at http://localhost:3002/sassdoc after `npm start`)

Add more sassdoc annotations like `/// @param` by seeing [docs here](http://sassdoc.com/annotations).

Build Sassdocs:
```
gulp compile:sassdoc
```

### JS and JS Documentation

Javascript documentation is handled by DocumentationJS. See [documenationJS](http://documentation.js.org/) docs at `./jsdoc` (at http://localhost:3002/jsdoc after `npm start`)

Add more jsdoc annotations like `/** @param */` by seeing [docs here](https://github.com/documentationjs/documentation/blob/master/docs/GETTING_STARTED.md).

Build JSdocs:
```
gulp compile:jsdocs
```


### Useful Links

Coming soon...

### Troubleshooting

1. Delete `node_modules` and re-install:
```
rm -rf node_modules
npm install
```

2. Errors involving 'glob patterns' are usually do to urls in the `gulpconfig.js` file not pointing to actually directories or files

3. Running `gulp -v` should return something like ...
```
[21:05:35] CLI version 1.2.2
[21:05:35] Local version 4.0.0-alpha.2
```

If it does not, then you will need to uninstall gulp globally and install the gulp-cli. See [gulpjs](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)