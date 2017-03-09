/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DomNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  on(eventName, callback) {
    this.nodes.forEach(node => {
      node.addEventListener(eventName, callback);
      const eventId = `event-${eventName}`;
      if (typeof node[eventId] === "undefined") {
        node[eventId] = [];
      }
      node[eventId].push(callback);
    });
  }

  off(eventName) {
    this.nodes.forEach(node => {
      const eventId = `event-${eventName}`;
      if (node[eventId]) {
        node[eventId].forEach(callback => {
          node.removeEventListener(eventName, callback);
        });
      }

      node[eventId] = [];
    });
  }

  html(html) {
    if (typeof html === "string") {
      this.nodes.forEach(node => node.innerHTML = html);
    } else {
      if (this.nodes.length > 0) {
        return this.nodes[0].innerHTML;
      }
    }
  }

  empty() {
    this.html('');
  }

  append(children) {
    if (this.nodes.length === 0) return;

    if (typeof children === "object" && !(children instanceof DomNodeCollection)) {
      children = $l(children);
    }

    if (typeof children === "string") {
      this.nodes.forEach(node => node.innerHTML += children);
    } else if (children instanceof DomNodeCollection) {
      this.nodes.forEach(node => {
        children.forEach(childNode => {
          node.appendChild(childNode.cloneNode(true));
        });
      });
    }
  }

  remove() {
    this.nodes.forEach(node => node.parentNode.removeChild(node));
  }

  attr(key, val) {
    if (typeof val === "string") {
      this.nodes.forEach (node => node.setAttribute(key, val));
    } else {
      return this.nodes[0].getAttribute(key);
    }
  }

  addClass(newClass) {
    this.nodes.forEach(node => node.classList.add(newClass));
  }

  removeClass(oldClass) {
    this.nodes.forEach(node => node.classList.remove(oldClass));
  }

  find(selector) {
    let foundNodes = [];
    this.nodes.forEach(node => {
      const nodeList = node.querySelectorAll(selector);
      foundNodes = foundNOdes.concat(Array.from(nodeList));
    });

    return new DomNodeCollection(foundNodes);
  }

  children() {
    let childNodes = [];
    this.nodes.forEach(node => {
      const childNodeList = node.children;
      childNodes = childNodes.concat(Array.from(childNodeList));
    });
    // debugger

    return new DomNodeCollection(childNodes);
  }

  parent() {
    const parentNodes = [];
    this.nodes.forEach(node => {
      if (node.parentNode.visited) {
        parentNodes.push(node.parentNode);
      } else {
        node.parentNode.visited = true;
      }
    });

    parentNodes.forEach(node => node.visited = false);
    return new DomNodeCollection(parentNodes);
  }
}

module.exports = DomNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DomNodeCollection = __webpack_require__(0);


const _docReadyCallbacks = [];
let _docReady = false;

window.$domingo = (arg) => {
  switch(typeof(arg)){
    case "string":
      return nodeGetter(arg);
    case "function":
      return registerCallback(arg);
    case "object":
      if (arg instanceof HTMLElement){
        return new DomNodeCollection(arg);
      }
  }
};

$domingo.extend = (base, ...objects) => {
  objects.forEach( object => {
    for (let prop in object) {
      base[prop] = object[prop];
    }
  });

  return base;
};

$domingo.ajax = options => {
  const request = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {}
  };
  options = $domingo.extend(defaults, options);
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

toQueryString = obj => {
  let result = "";
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      result += prop + "=" + obj[prop] + "&";
    }
  }

  return result.substring(0, result.length - 1);
};

window.nodeGetter = selector => {
  const nodes = document.querySelectorAll(selector);
  const nodesArray = Array.from(nodes);
  return new DomNodeCollection(nodesArray);
};

registerCallback = callback => {
  if(!_docReady) {
    _docReadyCallbacks.push(callback);
  } else {
    callback();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  _docReady = true;
  _docReadyCallbacks.forEach( callback => callback());
});


/***/ })
/******/ ]);