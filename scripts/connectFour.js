let playerState = 1;
let playerWhoWentFirst = 1;
let player1indicator = document.querySelector(".indicator .player1");
let player2indicator = document.querySelector(".indicator .player2");
let boardModel = [
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
  [null, null, null, null, null, null],
];

player1WinCounter = 0;
player2WinCounter = 0;

let winConditionFunction = function (mapArray) {
  let winConditionArray = [];

  //column win
  let columnArrayBuilder = function () {
    for (let i = 0; i < 7; i++) {
      winConditionArray.push(mapArray[i].join());
    }
  };

  //row win
  let rowArrayBuilder = function () {
    for (let row = 0; row < 6; row++) {
      let rowArray = [];
      for (let col = 0; col < 7; col++) {
        rowArray.push(mapArray[col][row]);
      }
      winConditionArray.push(rowArray.join());
    }
  };

  //Diagonals
  //left side diagonal win
  let diagonalFromLeftSideArrayBuilder = function () {
    for (let i = 0; i < 6; i++) {
      let itemsInDiagonal = 6 - i;
      let placeHolderArray = [];
      for (let j = 0; j < itemsInDiagonal; j++) {
        placeHolderArray.push(mapArray[j][i + j]);
      }
      winConditionArray.push(placeHolderArray.join());
    }
  };

  //left bottom diagonal win
  let diagonalFromLeftBottomArrayBuilder = function () {
    for (let i = 0; i < 6; i++) {
      let itemsInDiagonal = 6 - i;
      let placeHolderArray = [];
      for (let j = 0; j < itemsInDiagonal; j++) {
        placeHolderArray.push(mapArray[i + j + 1][j]);
      }
      winConditionArray.push(placeHolderArray.join());
    }
  };

  //right bottom diagonal win
  let diagonalFromRightBottomArrayBuilder = function () {
    for (let i = 0; i < 6; i++) {
      let itemsInDiagonal = i + 1;
      let placeHolderArray = [];
      for (let j = 0; j < itemsInDiagonal; j++) {
        placeHolderArray.push(mapArray[j][i - j]);
      }
      winConditionArray.push(placeHolderArray.join());
    }
  };

  //right side diagonal win
  let diagonalFromRightSideArrayBuilder = function () {
    for (let i = 0; i < 6; i++) {
      let itemsInDiagonal = 6 - i;
      let placeHolderArray = [];
      for (let j = 0; j < itemsInDiagonal; j++) {
        placeHolderArray.push(mapArray[j + i + 1][5 - j]);
      }
      winConditionArray.push(placeHolderArray.join());
    }
  };

  //function calling
  columnArrayBuilder();
  rowArrayBuilder();
  diagonalFromLeftSideArrayBuilder();
  diagonalFromLeftBottomArrayBuilder();
  diagonalFromRightBottomArrayBuilder();
  diagonalFromRightSideArrayBuilder();

  //Checks for win
  for (let i = 0; i < winConditionArray.length; i++) {
    if (winConditionArray[i].includes("1,1,1,1")) {
      document.querySelector(".modalMessage").innerHTML = "Player 1 wins!";
      document.querySelector(".modalContainer").style.display = "flex";
      player1WinCounter += 1;
      document.querySelector(".player1Score").innerHTML = player1WinCounter;
      return "player1";
    }
    if (winConditionArray[i].includes("2,2,2,2")) {
      document.querySelector(".modalMessage").innerHTML = "Player 2 wins!";
      document.querySelector(".modalContainer").style.display = "flex";
      player2WinCounter += 1;
      document.querySelector(".player2Score").innerHTML = player2WinCounter;
      return "player2";
    }
  }

  //checks for tie
  let nullCounter = 0;
  for (let i = 0; i < boardModel.length; i++) {
    for (let j = 0; j < boardModel[i].length; j++) {
      if (mapArray[i][j] === null) {
        nullCounter += 1;
      }
    }
  }
  if (nullCounter === 0) {
    document.querySelector(".modalMessage").innerHTML = "You tied!";
    document.querySelector(".modalContainer").style.display = "flex";
  }
};

//columnClickEvent function
let columnClickEvent = function (event) {
  let currentElement = event.currentTarget.id;
  let chosenPiece = document.createElement("div");
  let colArray = "";

  //sets colArray to current array related to the column selected.
  switch (currentElement) {
    case "column0":
      colArray = boardModel[0];
      break;
    case "column1":
      colArray = boardModel[1];
      break;
    case "column2":
      colArray = boardModel[2];
      break;
    case "column3":
      colArray = boardModel[3];
      break;
    case "column4":
      colArray = boardModel[4];
      break;
    case "column5":
      colArray = boardModel[5];
      break;
    case "column6":
      colArray = boardModel[6];
      break;
  }

  //finds the first empty slot and fills it in colArray, if no empty slots then it wont allow it to be filled
  for (let i = 0; i < colArray.length; i++) {
    if (colArray[i] === null) {
      colArray[i] = `${playerState}`;
      switch (playerState) {
        case 1:
          //adds player piece to DOM
          chosenPiece.className = "gamepiece player1";
          document.getElementById(`${currentElement}`).append(chosenPiece);

          //changes player state and indicates it on the screen
          playerState = 2;
          player1indicator.style.display = "none";
          player2indicator.style.display = "flex";
          winConditionFunction(boardModel);
          break;
        case 2:
          //adds player piece to DOM
          chosenPiece.className = "gamepiece player2";
          document.getElementById(`${currentElement}`).append(chosenPiece);

          //changes player state and indicates it on the screen
          playerState = 1;
          player1indicator.style.display = "flex";
          player2indicator.style.display = "none";
          winConditionFunction(boardModel);
          break;
      }

      return;
    }
  }
};

//Rematch button
let rematchClickEvent = function () {
  boardModel = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];
  for (let i = 0; i < boardModel.length; i++) {
    document.querySelector(`#column${i}`).innerHTML = "";
  }
  document.querySelector(".modalContainer").style.display = "none";
  switch (playerWhoWentFirst) {
    case 1:
      playerState = 2;
      player1indicator.style.display = "none";
      player2indicator.style.display = "flex";
      break;
    case 2:
      playerState = 1;
      player1indicator.style.display = "flex";
      player2indicator.style.display = "none";
      break;
  }
};

//all event listeners
document.querySelector("#rematch").addEventListener("click", rematchClickEvent);
document.querySelector("#column0").addEventListener("click", columnClickEvent);
document.querySelector("#column1").addEventListener("click", columnClickEvent);
document.querySelector("#column2").addEventListener("click", columnClickEvent);
document.querySelector("#column3").addEventListener("click", columnClickEvent);
document.querySelector("#column4").addEventListener("click", columnClickEvent);
document.querySelector("#column5").addEventListener("click", columnClickEvent);
document.querySelector("#column6").addEventListener("click", columnClickEvent);
