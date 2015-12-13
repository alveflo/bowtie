# Bowtie
[![Build Status](https://travis-ci.org/bowtie-js/bowtie.svg?branch=master)](https://travis-ci.org/bowtie-js/bowtie)
[![Coverage Status](https://coveralls.io/repos/bowtie-js/bowtie/badge.svg?branch=master&service=github)](https://coveralls.io/github/bowtie-js/bowtie?branch=master)

C-style syntaxed expressive template engine for node inspired by [Jade](http://jade-lang.com/).

## Current status
- [x] Basic html output
- [x] Loops
- [x] If-Else
- [x] Mixins
- [x] Extending
- [x] Importing
- [ ] Variables

## Example
```
html {
  head {
    title: "example"
    script(type="text/javascript") {
      for (var i = 0; i < 10; i++) {
        console.log("Example");
      }
    }
    style {
      body {
        background-color: #000;
      }
    }
  }

  body {
    div#content.middle.aligned.grid {
      p: "A paragraph"
    }
  }
}
```

The example above outputs:
```html
<html>
    <head>
        <title>example</title>
        <script type="text/javascript">
            for (var i = 0; i < 10; i++) {
                console.log("Example");
              }
        </script>
        <style>
            body {
                background-color: #000;
              }
        </style>
    </head>
    <body>
        <div id="content" class="middle aligned grid">
            <p>A paragraph</p>
        </div>
    </body>
</html>

```

## License
The MIT License
