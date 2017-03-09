document.addEventListener("DOMContentLoaded", () => {
  const artboard = $domingo('.artboard');
  artboard.html("");

  addRows(artboard, 100);

  const rows = $domingo('.row');

  for(var j = 0; j < 100; j++) {
    rows.append(`<div class="column"></div>`);
  }

  applyColor("green");


  let redButton = $domingo('.red-button');
  let greenButton = $domingo(".green-button");
  let blueButton = $domingo(".blue-button");

  redButton.on("click", () => {
    applyColor("red");
  });
  greenButton.on("click", () => {
    applyColor("green");
  });
  blueButton.on("click", () => {
    applyColor("blue");
  });


});

function randomColor() {
  let color = Math.floor(Math.random() * 255);
  if (color > 100) {
    color -= 100;
  }

  return color;
}

function color(color) {
  let someColor = randomColor();
  switch (color) {
    case "red":
      return `background-color: rgba(255, ${someColor}, ${someColor}, 0.5`;
    case "green":
      return `background-color: rgba(${someColor}, 255, ${someColor}, 0.5`;
    case "blue":
      return `background-color: rgba(${someColor}, ${someColor}, 255, 0.5`;
  }
}


function applyColor(thisColor) {
  let columns = $domingo(".column");
  for (var i = 0; i < columns.nodes.length; i++) {
    columns.nodes[i].setAttribute(
      "style",
      color(thisColor)
    );
  }
}

function addRows(selector, numRows) {
  for(var i = 0; i < numRows; i++) {
    selector.append(`<div class='row row${i}'></div>`);
  }
}

function addColumns(selector, numCols) {
  for(var i = 0; i < numCols; i++) {
    selector.append(`<div class="column"></div>`);
  }
}
