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
