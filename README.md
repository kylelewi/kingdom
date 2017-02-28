# Domingo
A lightweight DOM manipulation library that's easy like Sunday morning.

## In Action
Run the index.html file to see a quick demonstration of the library in action.

Example of $domingo usage:
```javascript
// programatically build out artboard grid
const artboard = $domingo('.artboard');
for(var i = 0; i < numRows; i++) {
  artboard.append(`<div class='row row${i}'></div>`);
}
```

```javascript
// change html element background color
function applyColor(thisColor) {
  let columns = $domingo(".column");
  for (var i = 0; i < columns.nodes.length; i++) {
    columns.nodes[i].setAttribute(
      "style",
      color(thisColor)
    );
  }
}
```

## Features and Implementation
Domingo allows users to interact with the DOM using the special DOMNodeCollection data type. This provides an API (outlined below) for manipulating DOM elements.

A DOMNodeCollection object can be created with the $domingo function:
```javascript
let selectAllDivs = $domingo("div");
// returns a DOMNodeCollection of all existing divs
let newDiv = $domingo("<div class='new-div'><div>");
// returns a new div as a DOMNodeCollection
```

## API
### append(children) and remove()

### html(innerHTML) and empty()

### on(type, listener) and off(type, listener)

### addClass(className) and removeClass(className)

### children() and parent()

### find(selector) and remove(selector)
