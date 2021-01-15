const level1 = ["WWWWW", "W W W", "S W F", "W   W", "WWWWW"];
const level2 = ["WWSWW", "WW  W", "W  WW", "W   W", "WWFWW"];
const level3 = [
  "WWWWWWWWWW",
  "WW      WW",
  "W   WW   W",
  "W   FW   W",
  "W WWWWW  W",
  "WWW  WW WW",
  "W        W",
  "W WWWWW WW",
  "W    WW  W",
  "WWWWSWWWWW",
];
const level4 = [
  "WWWWWWWWWWWWWWWWWWWWW",
  "W   W     W     W W W",
  "W W W WWW WWWWW W W W",
  "W W W   W     W W   W",
  "W WWWWWWW W WWW W W W",
  "W         W     W W W",
  "W WWW WWWWW WWWWW W W",
  "W W   W   W W     W W",
  "W WWWWW W W W WWW W F",
  "S     W W W W W W WWW",
  "WWWWW W W W W W W W W",
  "W     W W W   W W W W",
  "W WWWWWWW WWWWW W W W",
  "W       W       W   W",
  "WWWWWWWWWWWWWWWWWWWWW",
];
const level5 = [
  "WWWWWWWWWWWWWWWWWWWWWW",
  "W WWW W WWW W WWWWW  F",
  "W W W W WWW W WW WW WW",
  "W W   W WWW W W   W WW",
  "W W W W WWW W W W W WW",
  "W W W W     W W W W WW",
  "W WWW W WWW W W W W WW",
  "W   W W WWW W W WWW WW",
  "W W W W WWWWW W W W WW",
  "W W W W W W   W W W WW",
  "W W W W W W   W W W WW",
  "W W W W W W W W W W WW",
  "W W W   W W W   W   WW",
  "W W W   W W W WWW W WW",
  "W W W W W W W   W W WW",
  "W W W W W   W W W W WW",
  "W W   W W W W W W WWWW",
  "W W W W   W W W   W WW",
  "W W W W WWW W W W W WW",
  "W W WWW WWW W   W   WW",
  "S W WWW WWW W WWW W WW",
  "WWWWWWWWWWWWWWWWWWWWWW",
];

let selectedMap = 0;

let charArrayLocation = {
  row: 0,
  col: 0,
};
let charVisibleLocation = {
  top: 0,
  left: 0,
};
let finishingArrayLocation = {
  row: 0,
  col: 0,
};

// creates character in the maze container
let mazeContainer = document.querySelector(".maze-container");
let startingPoint = document.createElement("div");
startingPoint.className = "col character";
mazeContainer.append(startingPoint);
let charWidth = document.querySelector(".col").offsetWidth;
let charHeight = document.querySelector(".col").offsetHeight;

// initializes level selectors
let level1Button = document.querySelector("#level1");
let level2Button = document.querySelector("#level2");
let level3Button = document.querySelector("#level3");
let level4Button = document.querySelector("#level4");
let level5Button = document.querySelector("#level5");
let levelSelector = document.querySelector(".levelselector");

// function to reload page
let reload = function () {
  location.reload();
};

//reload button on modal
let restartButton = document.querySelector("#restart");
restartButton.addEventListener("click", reload);

let createMaze = function (mapArray) {
  let root = document.documentElement;
  let rowNum = mapArray.length;
  let colNum = mapArray[0].length;
  root.style.setProperty("--num-rows", rowNum);
  root.style.setProperty("--num-cols", colNum);

  for (let row = 0; row < mapArray.length; row++) {
    let rowDiv = document.createElement("div");
    rowDiv.className = "row";
    for (let col = 0; col < mapArray[row].length; col++) {
      let colDiv = document.createElement("div");
      switch (mapArray[row][col]) {
        case "W":
          colDiv.className = "col wall";
          break;
        case " ":
          colDiv.className = "col floor";
          break;
        case "S":
          colDiv.className = "col start";
          charVisibleLocation.top = row * charHeight;
          startingPoint.style.top = `${charVisibleLocation.top}px`;
          charVisibleLocation.left = col * charWidth;
          startingPoint.style.left = `${charVisibleLocation.left}px`;
          charArrayLocation.row = row;
          charArrayLocation.col = col;
          break;
        case "F":
          colDiv.className = "col finish";
          finishingArrayLocation.row = row;
          finishingArrayLocation.col = col;
          break;
      }

      rowDiv.append(colDiv);
    }
    mazeContainer.append(rowDiv);
  }
};

let runEventListener = function () {
  document.addEventListener("keydown", logKey);

  function logKey(e) {
    switch (e.code) {
      case "ArrowDown":
        if (
          selectedMap[charArrayLocation.row + 1][charArrayLocation.col] ===
            " " ||
          selectedMap[charArrayLocation.row + 1][charArrayLocation.col] === "F"
        ) {
          charArrayLocation.row += 1;
          charVisibleLocation.top += charHeight;
          startingPoint.style.top = `${charVisibleLocation.top}px`;
        }

        break;

      case "ArrowUp":
        if (
          selectedMap[charArrayLocation.row - 1][charArrayLocation.col] ===
            " " ||
          selectedMap[charArrayLocation.row - 1][charArrayLocation.col] === "F"
        ) {
          charArrayLocation.row -= 1;
          charVisibleLocation.top -= charHeight;
          startingPoint.style.top = `${charVisibleLocation.top}px`;
        }

        break;
      case "ArrowLeft":
        if (
          selectedMap[charArrayLocation.row][charArrayLocation.col - 1] ===
            " " ||
          selectedMap[charArrayLocation.row][charArrayLocation.col - 1] === "F"
        ) {
          charArrayLocation.col -= 1;
          charVisibleLocation.left -= charWidth;
          startingPoint.style.left = `${charVisibleLocation.left}px`;
        }

        break;
      case "ArrowRight":
        if (
          selectedMap[charArrayLocation.row][charArrayLocation.col + 1] ===
            " " ||
          selectedMap[charArrayLocation.row][charArrayLocation.col + 1] === "F"
        ) {
          charArrayLocation.col += 1;
          charVisibleLocation.left += charWidth;
          startingPoint.style.left = `${charVisibleLocation.left}px`;
        }

        break;
    }
    if (
      charArrayLocation.row === finishingArrayLocation.row &&
      charArrayLocation.col === finishingArrayLocation.col
    ) {
      setTimeout(function () {
        document.querySelector(".modal-container").style.display = "flex";
      }, 250);
    }
  }
};

let levelLoader = function (level) {
  mazeContainer.innerHTML = "";
  levelSelector.innerHTML = "";
  mazeContainer.append(startingPoint);
  selectedMap = level;
  createMaze(selectedMap);
  runEventListener();
};

level1Button.addEventListener("click", function () {
  levelLoader(level1);
});

level2Button.addEventListener("click", function () {
  levelLoader(level2);
});

level3Button.addEventListener("click", function () {
  levelLoader(level3);
});

level4Button.addEventListener("click", function () {
  levelLoader(level4);
});

level5Button.addEventListener("click", function () {
  levelLoader(level5);
});
