# Bowtie
[![Build Status](https://travis-ci.org/bowtie-js/bowtie.svg?branch=master)](https://travis-ci.org/bowtie-js/bowtie)

C-style syntaxed expressive template engine for node inspired by Jade.

## Current status
- ✔ basic html output
- ✔ loops
- ✔ if-else
- ◦ variables
- ✔ mixins
- ◦ importing
- ◦ extending

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
