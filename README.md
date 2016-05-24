# Dialog

Dialog component for [react](https://facebook.github.io/react/).

Build with [webpack](https://webpack.github.io/) and [CSS Modules](https://github.com/css-modules/css-modules)

[Story book](https://rc-component.github.io/dialog/)

## Design philosophy

* Stateless and no default visible styles.
* Predefined effects and be customized easily.
* Smart overlay support, cover the whole viewport if position element is `document.body`

## Install

    npm i rc-minidialog -S

## Usage

``` javascript
<Dialog
  show={this.state.dialog}
  top={150}
  width={300}
/>
```

## Props

name   | type   | default    | description
-------| ------ | ---------- | ------------
*show   | boolean| false      | Show the dialog if true
overlay | boolean | true     | Whether to have overlay element
overlayStyle| Object | null  | Style for overlay element, only used when overlay is true
effect | string | 'slide'    | Effect for show dialog, could be 'slide' 'scale' or ''
transitionName | string | ''     | [Traisntion className](https://facebook.github.io/react/docs/animation.html) for dialog traisition, override `effect`
top    | number | 150        | Shortcut of style.position.top
width | number | 300         | Shortcut of style.width

`style` and `className` apply to underneath dialog element.

# License

Copyright 2016 chemzqm@gmail.com

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
