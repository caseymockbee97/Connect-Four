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
let userSelectedColumn = 0;
let userSelectedRow = 0;

player1WinCounter = 0;
player2WinCounter = 0;

let winCondtionFunction = function () {
  let winConditionArray = [];
  //column win
  let verticalWinCondition = function () {
    let verticleWinArray = [];
    for (let i = -10; i < 10; i++) {
      if (userSelectedRow + i >= 0 && userSelectedRow + i < 6) {
        verticleWinArray.push(
          boardModel[userSelectedColumn][userSelectedRow + i]
        );
      }
    }
    winConditionArray.push(verticleWinArray.join());
  };
  //horizontal win
  let horizontalWinCondition = function () {
    let horizontalWinArray = [];
    for (let i = -10; i < 10; i++) {
      if (userSelectedColumn + i >= 0 && userSelectedColumn + i < 7) {
        horizontalWinArray.push(
          boardModel[userSelectedColumn + i][userSelectedRow]
        );
      }
    }
    winConditionArray.push(horizontalWinArray.join());
  };
  //leftdiagonal win
  let leftDiagonalWinCondition = function () {
    let leftDiagonalWinArray = [];
    for (let i = -10; i < 10; i++) {
      if (
        userSelectedColumn + i >= 0 &&
        userSelectedColumn + i < 7 &&
        userSelectedRow + i >= 0 &&
        userSelectedRow + i < 6
      ) {
        leftDiagonalWinArray.push(
          boardModel[userSelectedColumn + i][userSelectedRow + i]
        );
      }
    }
    winConditionArray.push(leftDiagonalWinArray.join());
  };
  //rightdiagonal win
  let rightDiagonalWinCondition = function () {
    let rightDiagonalWinArray = [];
    for (let i = -10; i < 10; i++) {
      if (
        userSelectedColumn + i >= 0 &&
        userSelectedColumn + i < 7 &&
        userSelectedRow - i >= 0 &&
        userSelectedRow - i < 6
      ) {
        rightDiagonalWinArray.push(
          boardModel[userSelectedColumn + i][userSelectedRow - i]
        );
      }
    }
    winConditionArray.push(rightDiagonalWinArray.join());
  };
  rightDiagonalWinCondition();
  leftDiagonalWinCondition();
  verticalWinCondition();
  horizontalWinCondition();
  //Checks for win
  for (let i = 0; i < winConditionArray.length; i++) {
    if (winConditionArray[i].includes("1,1,1,1")) {
      document.querySelector(".modalMessage").innerHTML = "Player 1 wins!";
      document.querySelector(".modalContainer").style.display = "flex";
      player1WinCounter += 1;
      document.querySelector(".player1Score").innerHTML = player1WinCounter;
    }
    if (winConditionArray[i].includes("2,2,2,2")) {
      document.querySelector(".modalMessage").innerHTML = "Player 2 wins!";
      document.querySelector(".modalContainer").style.display = "flex";
      player2WinCounter += 1;
      document.querySelector(".player2Score").innerHTML = player2WinCounter;
    }
  }
  //checks for tie
  let nullCounter = 0;
  for (let i = 0; i < boardModel.length; i++) {
    for (let j = 0; j < boardModel[i].length; j++) {
      if (boardModel[i][j] === null) {
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
      userSelectedColumn = 0;
      break;
    case "column1":
      colArray = boardModel[1];
      userSelectedColumn = 1;
      break;
    case "column2":
      colArray = boardModel[2];
      userSelectedColumn = 2;
      break;
    case "column3":
      colArray = boardModel[3];
      userSelectedColumn = 3;
      break;
    case "column4":
      colArray = boardModel[4];
      userSelectedColumn = 4;
      break;
    case "column5":
      colArray = boardModel[5];
      userSelectedColumn = 5;
      break;
    case "column6":
      colArray = boardModel[6];
      userSelectedColumn = 6;
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
          //sets row value
          userSelectedRow = i;
          //changes player state and indicates it on the screen
          playerState = 2;
          player1indicator.style.display = "none";
          player2indicator.style.display = "flex";
          winCondtionFunction();
          break;
        case 2:
          //adds player piece to DOM
          chosenPiece.className = "gamepiece player2";
          document.getElementById(`${currentElement}`).append(chosenPiece);
          //sets row value
          userSelectedRow = i;
          //changes player state and indicates it on the screen
          playerState = 1;
          player1indicator.style.display = "flex";
          player2indicator.style.display = "none";
          winCondtionFunction();
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
