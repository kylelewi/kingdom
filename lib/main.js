const DomNodeCollection = require("./dom_node_collection");


const _docReadyCallbacks = [];
let _docReady = false;

window.$kingDOM = (arg) => {
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

$kingDOM.extend = (base, ...objects) => {
  objects.forEach( object => {
    for (let prop in object) {
      base[prop] = object[prop];
    }
  });

  return base;
};

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
