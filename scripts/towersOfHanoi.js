let topDisc = "";
//grabbing disc from tower 1
let grabDisc = function (tower) {
  topDisc = document.getElementById(tower).lastElementChild;
};

let newTower = "";
//grabbing new tower to move it to
let moveDisc = function (tower) {
  newTower = document.getElementById(tower).appendChild(topDisc);
};

let reload = function () {
  location.reload();
};

//event listeners
let towerClickedArray = [];
let towerClicked = function (event) {
  if (towerClickedArray.length === 0) {
    //if its their first click, run this
    if (event.currentTarget.lastElementChild === null) {
      return;
    }
  }

  towerClickedArray.push(event.currentTarget.id); //adding to array on click

  console.log(towerClickedArray);

  if (towerClickedArray.length === 1) {
    document.getElementById("description").innerText =
      "Click the box you want to move the disc to.";

    document.getElementById(
      towerClickedArray[0]
    ).lastElementChild.style.boxShadow = "0 0 10px red";

    return;
  } else if (towerClickedArray.length === 2) {
    document.getElementById("description").innerText =
      "Click the box with the disc you want to move.";

    document.getElementById(
      towerClickedArray[0]
    ).lastElementChild.style.boxShadow = "0 0 5px black";

    //oldTowerWidth is already protected by line 19
    let oldTowerWidth = document.getElementById(towerClickedArray[0])
      .lastElementChild.clientWidth;
    let newTowerWidth = "Empty Tower";

    //protects newTowerWidth
    if (
      document.getElementById(towerClickedArray[1]).lastElementChild !== null
    ) {
      newTowerWidth = document.getElementById(towerClickedArray[1])
        .lastElementChild.clientWidth;
    }

    //if width2 is more than width1 then dont run the code
    if (newTowerWidth > oldTowerWidth || newTowerWidth === "Empty Tower") {
      grabDisc(towerClickedArray[0]);
      moveDisc(towerClickedArray[1]);
    } else {
      document
        .getElementById("description")
        .prepend("You can't put a bigger disc on top of a smaller disc! ");
    }
    towerClickedArray = [];
  }

  //wincondition
  if (document.getElementById("tower3").childElementCount === 4) {
    document.getElementById("description").innerText = "You Win!";
    setTimeout(function () {
      document.querySelector(".modal-container").style.display = "flex";
    }, 750);

    setTimeout(function () {
      location.reload();
    }, 5000);
  }
};

let tower1 = document.querySelector("#tower1");
tower1.addEventListener("click", towerClicked);

let tower2 = document.querySelector("#tower2");
tower2.addEventListener("click", towerClicked);

let tower3 = document.querySelector("#tower3");
tower3.addEventListener("click", towerClicked);

let restartButton = document.querySelector("#restart");
restartButton.addEventListener("click", reload);
