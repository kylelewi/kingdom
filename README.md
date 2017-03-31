# $kingDOM
A lightweight DOM manipulation library.

## Setup
Download the source files lib/dom_node_collection.js and lib/main.js and include them in your project.

## In Action
Run the index.html file to see a quick demonstration of the library in action.

Example of $kingDOM usage:
```javascript
// programatically build out artboard grid
const artboard = $kingDOM('.artboard');
for(let i = 0; i < numRows; i++) {
  artboard.append(`<div class='row row${i}'></div>`);
}
```

```javascript
// change html element background color
function applyColor(thisColor) {
  let columns = $kingDOM(".column");
  for (let i = 0; i < columns.nodes.length; i++) {
    columns.nodes[i].setAttribute(
      "style",
      color(thisColor)
    );
  }
}
```

## Features and Implementation
KingDOM allows users to interact with the DOM using the special DOMNodeCollection data type. This provides an API (outlined below) for manipulating DOM elements.

A DOMNodeCollection object can be created with the $kingDOM function:
```javascript
let selectAllDivs = $kingDOM("div");
// returns a DOMNodeCollection of all existing divs
let newDiv = $kingDOM("<div class='new-div'><div>");
// returns a new div as a DOMNodeCollection
```

### Ajax

$KingDOM also ships with an Ajax function, `$kingDOM.ajax(options)`.

```javascript
$kingDOM.ajax = options => {
  const request = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {}
  };
  options = $kingDOM.extend(defaults, options);
  options.method = options.method.toUpperCase();

  if (options.method === "GET"){
    options.url += "?" + toQueryString(options.data);
  }

  request.open(options.method, options.url, true);
  request.onload = e => {
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
};

```

We make a `new XMLHttpRequest()` object and call `.open(options.method, options.url, true)` to pass in the method and url from the options object (and true to make it asynchronous). Using a special helper method `toQueryString()` we have all the POST functionality of Ajax.

We then add an `onload` event listener and pass in both a `success` and `error` callback which we stored in the options object.

When we finally send the request we'll pass in data from the object, send a request to the specified URL and invoke our success/error callbacks once we receive a response!

## API
- `append(content)`: appends `content` to last element in the `DOMNodeCollection`.
 - `remove()`: removes the DOM element.
- `html(textContent)`: replaces HTML in an element if passed an argument, otherwise returns element's HTML
- `on(event, callback)`: places an event listener on the DOM element with the provided callback
- `off(event)`: removes the event listener from the DOM element
- `removeClass(className)`: removes `className` from the DOM elements' classList.
- `children()`: returns all of the nested DOM elements as a `DOMNodeCollection`
 - `parent()`: returns the parent DOM element as a `DOMNodeCollection`.
- `find(selector)`: returns the DOM elements of the children of the element
