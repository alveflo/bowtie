# Bowtie
[![Build Status](https://travis-ci.org/bowtie-js/bowtie.svg?branch=master)](https://travis-ci.org/bowtie-js/bowtie)
[![Coverage Status](https://coveralls.io/repos/bowtie-js/bowtie/badge.svg?branch=master&service=github)](https://coveralls.io/github/bowtie-js/bowtie?branch=master)

Expressive template engine for Node.js heavily inspired by [Jade](http://jade-lang.com/).

## Goals
This project aims to develop an expressive template language to write html documents using the [dry](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) and [kiss](https://en.wikipedia.org/wiki/KISS_principle) principles. And of course, remove the pain of writing angle brackets.
## Current status
This project is currently in it's pre-alpha stage. Current features:
- [x] Basic html output
- [x] Loops
- [x] If-Else
- [x] Mixins
- [x] Extending
- [x] Importing
- [ ] Variables

## Installation
```
$ npm install bowtie-js
```
##### Syntax highlighting
Syntax highlighting and auto completion is available for [Atom editor](https://atom.io/), currently in a alpha non-released stage. Available [here](https://github.com/bowtie-js/atom-language-bowtie).
```
$ git clone https://github.com/bowtie-js/atom-language-bowtie.git
$ cd atom-language-bowtie
$ apm link
```
... And then restart (or ctrl+alt+r) Atom.

## Using gulp
Gulp compatible compiling comes out of the box with Bowtie, example:
```javascript
var gulp = require('gulp');
var bowtie = require('bowtie-js').gulp;

gulp.task('bowtie', function() {
  return gulp.src('*.bow')
    .pipe(bowtie({
      // Pretty output
      "pretty": true,
      // Object to pass to template engine
      "locals": {
        "title": "Example application"
      }
    }))
    .pipe(gulp.dest('./dist'));
});
```

## Example
```
!doctype("html")
html {
  head {
    title: $title
  }
  body {
    div.className {
      h1: "Example"
      p: "Hello world!"
    }
  }
}
```

The example above outputs:
```html
<html>
    <head>
        <title>Example application</title>
    </head>
    <body>
        <div class="className">
            <h1>Example</h1>
            <p>Hello world!</p>
        </div>
    </body>
</html>

```

## License
The MIT License
