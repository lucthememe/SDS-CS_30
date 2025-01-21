// star trader
// Luc Coutu
// start date 26/11/2024

let player = {
  x: 500,
  y: 500,
  location: "test station",
  cargoHoldSize: 10,
  fuel: 7070,
  FuelTankSise: 7070,
  fuelUse: 10,
  bank: 100000,
  ownedShips: ["starter"],
  iron: 0,
  copper: 0,
  tungsten: 0,
  water: 0,
  aluminum: 0,
  processedFood: 0,
  quantainium: 0,
  constructionMaterials: 0,
  RMC: 0,
  distilledSpirits: 0,
  agriculturalSupplies: 0,
  compboard: 0,
  waste: 0,
};

let ships = {
  strarter: [10, 7070],
  cutty: [50, 9000],
};

const galaxyXMax = 1000;
const galaxyYMax = 1000;
const defualtCargoAmount = 200;
const fuelPrice = 5;
let stationSelect;
let orbit = 0;
let textureDepth;
let bGIMG;
let curentship;

const cargo = {
  iron: "iron",
  copper: "copper",
  tungsten: "tungsten",
  water: "water",
  aluminum: "aluminum",
  processedFood: "processedFood",
  quantainium: "quantainium",
  constructionMaterials: "constructionMaterials",
  RMC: "RMC",
  distilledSpirits: "distilledSpirits",
  agriculturalSupplies: "agriculturalSupplies",
  compboard: "compboard",
  waste: "waste",
};

const cargoBuyDefualt = {
  iron: 300,
  copper: 280,
  tungsten: 500,
  water: 640,
  aluminum: 221,
  processedFood: 288,
  quantainium: 2269,
  constructionMaterials: 1800,
  RMC: 9774,
  distilledSpirits: 355,
  agriculturalSupplies: 232,
  compboard: 15373,
  waste: 10,
};

const cargoSellDefualt = {
  iron: 380,
  copper: 355,
  tungsten: 600,
  water: 750,
  aluminum: 288,
  processedFood: 394,
  quantainium: 2670,
  constructionMaterials: 2300,
  RMC: 11300,
  distilledSpirits: 555,
  agriculturalSupplies: 331,
  compboard: 16910,
  waste: 20,
};

let shipModels ={
  // model by turrboenvy https://www.thingiverse.com/thing:6507653
  cutty: null,

  // model by Propellant https://www.thingiverse.com/thing:2994059
  starter: null,

  //model by orangedudes_41 https://www.thingiverse.com/thing:6536727
  titan: null,
};

const stationNameComponents = {
  prefix: ["Big", "Small", "Long", "Short", "Wide", "Narrow", "Handsome", "Bald", "Anxious", "Agreeable", "Brave", "Defiant", "Distinct", "Calm", "Charming", "Blushing", "Colourful", "Green", "Astonishing", "Unbound", "Cold", "Hot", "Fiery", "Frosty", "Greater", "Lesser", "Jaded"],
  sufix: ["forest", "art", "rock", "tree", "yard", "tundra", "garden", "desert", "range", "field", "cane", "arson", "landing", "pool", "cube", "murder", "cave", "moose", "nerd", "dream", "express", "glade", "dragon", "frost", "taiga", "jade"],
};

const stationType = {
  smelter: [[cargo.water, cargo.processedFood, cargo.distilledSpirits], [cargo.iron, cargo.copper, cargo.tungsten, cargo.aluminum, cargo.waste]],
  shipYard: [[cargo.RMC, cargo.constructionMaterials, cargo.compboard, cargo.tungsten], [cargo.waste]],
  scrapYard: [[cargo.water, cargo.processedFood, cargo.distilledSpirits], [cargo.iron, cargo.RMC, cargo.constructionMaterials, cargo.waste]],
  scienceLab: [[cargo.water, cargo.processedFood, cargo.compboard], [cargo.waste, cargo.quantainium, cargo.agriculturalSupplies]],
  eggriculture: [[cargo.waste, cargo.constructionMaterials, cargo.agriculturalSupplies], [cargo.water, cargo.processedFood, cargo.distilledSpirits, cargo.waste]],
  manufacturingHub: [[cargo.iron, cargo.copper, cargo.aluminum], [cargo.compboard, cargo.waste]],
};

let genratedstations = [];

let music = {
  // music by Pedro Macedo Camacho https://en.wikipedia.org/wiki/Pedro_Camacho
  track1: null,
  track2: null,
  track3: null,
  track4: null,
};

//this class holds info for all stations and can generate new stations 
class CreateStation {
  /**
   * @param {*} name name of the station
   * @param {*} x the x coord of the station 
   * @param {*} y the y coord of the station 
   * @param {*} preset tells if the station was a preset station
   * @param {*} productionType the production type of the station
   */
  constructor(name, x, y, preset, productionType) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.preset = preset;
    this.productionType = productionType;
    this.cargo = productionType;
    this.colourBase = [random(255), random(255), random(255)];
    this.colourSecond = [random(255), random(255), random(255)];


  }

  /**
   * generates a new random station
   */
  GenrateRandomStation() {
    this.CreateCargoList();
    this.CreateStationCoordinates();
    this.CreateStationName();
  }

  /**
   * uses the makeCargoList function to generate a cargo list
   */
  CreateCargoList() {
    this.cargo = makeCargoList(this.cargo);
  }

  /**
   * generate a station name 
   */
  CreateStationName() {
    let nameHolder;
    let newName = false;
    while (newName === false) {
      nameHolder = stationNameComponents.prefix[Math.round(random(stationNameComponents.prefix.length - 1))] + " " + stationNameComponents.sufix[Math.round(random(stationNameComponents.sufix.length - 1))] + " station";
      newName = true;
      for (let i = 0; i < genratedstations.length; i++) {
        if (nameHolder === genratedstations[i].name) {
          newName = false;
        }
      }
    }
    this.name = nameHolder;
  }

  /**
   * randomly generate station coordenates
   */
  CreateStationCoordinates() {
    let newCoordinates = false;
    let coordinateXHolder;
    let coordinateYHolder;
    while (newCoordinates === false) {
      coordinateYHolder = Math.round(random(galaxyXMax));
      coordinateXHolder = Math.round(random(galaxyYMax));
      newCoordinates = true;
      for (let i = 0; i < genratedstations.length; i++) {
        if (coordinateXHolder === genratedstations[i].x && coordinateYHolder === genratedstations[i].y) {
          newCoordinates = false;
        }
      }
    }
    this.x = coordinateXHolder;
    this.y = coordinateYHolder;
  }

};


function preload() {
  music.track1 = loadSound("Creating a Better World.mp3");
  music.track2 = loadSound("Loreville.mp3");
  music.track3 = loadSound("Majesty Of Space.mp3");
  music.track4 = loadSound("Mission Preparations.mp3");
  shipModels.cutty = loadModel("low_poly_cutlass_black.stl");
  shipModels.starter = loadModel("hauler.stl");
  shipModels.titan = loadModel("bile-titan.stl");
  textureDepth = loadImage("low-poly-background (1).jpg");
  bGIMG = loadImage("updated-skybox-in-evocati-3-24-2-repost-fixed-captions-v0-wb8djgpcagrd1.webp");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  genratedstations.push(new CreateStation("test station", 500, 500, true, stationType.smelter));
  for (let i = 0; i < 5; i++) {
    gernateStation();
    console.log(stationInfoCheck(genratedstations[i].x, genratedstations[i].y, genratedstations));
  }
  console.log(genratedstations);
  stationTravelPicker(player.x, player.y, genratedstations, player.location);

}

function draw() {
  orbit = millis() * 0.001;
  panorama(bGIMG);
  stationTravelUpdater(player.x, player.y, genratedstations, player.location, stationSelect.selected());
  //circle(mouseX, mouseY, 100);
  stationRender(genratedstations, player.location);
  cargobuyer(player.location, cargoBuyDefualt, cargoSellDefualt, genratedstations);
}

function keyPressed() {
  musicBox();
}

/**
 * generats a cargo list depending on station type
 * @param {*} proType the type of station to genrated a cargo list for
 * @returns  2 arrays of cargo that the station will buy and sell
 */
function makeCargoList(proType) {
  let cargoArray = [];
  let tempArray = [];
  let tempMap = new Map;
  let tempCargo;
  let maxCargoBuyAmount;
  let maxCargoSellAmount;
  let cargoBuyAmount;
  let cargoSellAmount;

  maxCargoBuyAmount = proType[0].length - 1;
  maxCargoSellAmount = proType[1].length - 1;

  cargoBuyAmount = Math.round(random(2, maxCargoBuyAmount));
  cargoSellAmount = Math.round(random(2, maxCargoSellAmount));

  for (cargoBuyAmount; cargoBuyAmount > 0; cargoBuyAmount--) {
    tempCargo = proType[0][Math.round(random(maxCargoBuyAmount))];
    if (tempMap.has(tempCargo)) {
      tempMap.set(tempCargo, tempMap.get(tempCargo) + defualtCargoAmount);
    }
    else {
      tempMap.set(tempCargo, defualtCargoAmount);
    }
  }
  for (let [key, value] of tempMap) {
    tempArray.push([key, value]);
  }
  cargoArray.push(tempArray);
  tempArray = [];

  for (let [key, value] of tempMap) {
    tempMap.delete(key);
  }

  for (cargoSellAmount; cargoSellAmount > 0; cargoSellAmount--) {
    tempCargo = proType[1][Math.round(random(maxCargoSellAmount))];
    if (tempMap.has(tempCargo)) {
      tempMap.set(tempCargo, tempMap.get(tempCargo) + defualtCargoAmount);
    }
    else {
      tempMap.set(tempCargo, defualtCargoAmount);
    }
  }
  for (let [key, value] of tempMap) {
    tempArray.push([key, value]);
  }
  cargoArray.push(tempArray);
  tempArray = [];

  return cargoArray;
};

/**
 * generate a random station and pushes that station to the genrated station array
 */
function gernateStation() {
  let stationNumber = genratedstations.length;
  let stationRand = random(6);
  let stationRandType = null;

  if (stationRand <= 1) {
    stationRandType = stationType.eggriculture;
  }
  else if (stationRand <= 2 && stationRand < 1) {
    stationRandType = stationType.manufacturingHub;
  }
  else if (stationRand <= 3 && stationRand < 2) {
    stationRandType = stationType.scienceLab;
  }
  else if (stationRand <= 4 && stationRand < 3) {
    stationRandType = stationType.scrapYard;
  }
  else if (stationRand <= 5 && stationRand < 4) {
    stationRandType = stationType.shipYard;
  }
  else {
    stationRandType = stationType.smelter;
  }

  genratedstations.push(new CreateStation("", 0, 0, false, stationRandType));
  genratedstations[stationNumber].GenrateRandomStation();

}

/**
 * checks the info of a given station at the players currant coordinates
 * @param {*} playerX the currant x coordinate of the player
 * @param {*} playerY the currant y coordinate of the player
 * @param {*} stationList the list of genratted stations
 * @returns returns a array containing the station name the cargo that station buys and the cargo that station sells
 */
function stationInfoCheck(playerX, playerY, stationList) {
  let stationName;
  let stationCargoBuy;
  let stationCargoSell;
  for (let i = 0; i < stationList.length; i++) {
    if (playerX === stationList[i].x && playerY === stationList[i].y) {
      stationName = stationList[i].name;
      stationCargoBuy = stationList[i].cargo[0];
      stationCargoSell = stationList[i].cargo[1];
    }
  }
  return [stationName, stationCargoBuy, stationCargoSell];

}

/**
 *  checks the distance to all other stations and how much fuel it will cost to travel there  
 * @param {*} playerX the currant x coordinate of the player
 * @param {*} playerY the currant y coordinate of the player
 * @param {*} stationList the list of genratted stations
 * @returns a array of station names the distance to the stations and the fuel cost to travel to the stations
 */
function stationDistCheck(playerX, playerY, stationList) {
  let distArray = [];
  let stationXHolder;
  let stationYHolder;
  let stationNameHolder;
  let xDist;
  let yDist;
  let totalDist;
  for (i = 0; i < stationList.length; i++) {
    stationXHolder = stationList[i].x;
    stationYHolder = stationList[i].y;
    stationNameHolder = stationList[i].name;

    xDist = Math.abs(playerX - stationXHolder);
    yDist = Math.abs(playerY - stationYHolder);
    totalDist = Math.sqrt(xDist ** 2 + yDist ** 2);
    totalDist = Math.round(totalDist);
    distArray.push([stationNameHolder, "distance: " + totalDist, "fuel cost: " + totalDist * player.fuelUse]);
  }
  return distArray;
}

/**
 * creates a list of stations you can traval to 
 * @param {*} playerX the curant player x coord
 * @param {*} playerY the curant player y coord
 * @param {*} stationList a array of the genrated stations
 * @param {*} playerLocation the curant player location
 */
function stationTravelPicker(playerX, playerY, stationList, playerLocation) {
  let distArray = stationDistCheck(playerX, playerY, stationList);
  stationSelect = createSelect();
  stationSelect.position(10, 10);
  stationSelect.option(playerLocation);
  stationSelect.selected(playerLocation);


  for (let i = 0; i < distArray.length; i++) {
    if (distArray[i][0] !== playerLocation) {
      stationSelect.option(distArray[i]);
    }
  }
}

/**
 * updates a list of stations you can travel to 
 * @param {*} playerX the current player x coord
 * @param {*} playerY the curent player y coord
 * @param {*} stationList a array of the generated stations
 * @param {*} playerLocation the current player location
 * @param {*} selectedLocation the current selected location on the dropdown menu
 */
function stationTravelUpdater(playerX, playerY, stationList, playerLocation, selectedLocation) {

  if (playerLocation !== selectedLocation) {
    let distArray = stationDistCheck(playerX, playerY, stationList);
    let distStringArray = [];
    for (let i = 0; i < distArray.length; i++) {
      distStringArray.push(distArray[i][0] + "," + distArray[i][1] + "," + distArray[i][2]);
    }
    let selectedIndex = distStringArray.indexOf(selectedLocation);
    console.log(distStringArray);
    console.log(selectedLocation);
    console.log(selectedIndex);

    playerLocation = distArray[selectedIndex][0];
    player.location = distArray[selectedIndex][0];
    player.x = stationList[selectedIndex].x;
    player.y = stationList[selectedIndex].y;
    travelFuelUpdater(player.fuelUse, naturalSplit(distArray[selectedIndex][1])[1]);
    console.log(player);
    console.log(stationList);
    console.log(naturalSplit(distArray[selectedIndex][1])[1]);

    stationSelect.remove();
    stationSelect = createSelect();
    stationSelect.position(10, 10);
    stationSelect.option(playerLocation);
    stationSelect.selected(playerLocation);
    distArray = stationDistCheck(player.x, player.y, stationList);
    for (let i = 0; i < distArray.length; i++) {
      if (distArray[i][0] !== playerLocation && naturalSplit(distArray[i][2])[1] <= player.fuel) {
        stationSelect.option(distArray[i]);
      }
    }
  }
}

/**
 * removes a amount of fuel depending on dist travaled
 * @param {*} fuelUse 
 * @param {*} distanceTraveled 
 */
function travelFuelUpdater(fuelUse, distanceTraveled) {
  player.fuel -= distanceTraveled * fuelUse;
  refiller();
}

/**
 * splits a str into a array seprating numbers and letters
 * code by CodeManX https://stackoverflow.com/questions/3370263/separate-integers-and-text-in-a-string?rq=3
 * @param {*} str the string you want to split
 * @returns a array seprating numbers and letters
 */
function naturalSplit(str) {
  'use strict';
  let arr = [];
  let split = str.split(/(\d+)/);
  for (let i in split) {
    let s = split[i];
    if (s !== "") {
      if (i % 2) {
        arr.push(+s);
      } 
      else {
        arr.push(s);
      }
    }
  }
  return arr;
}

/**
 * refills the fuel tank and charges the player bank
 */
function refiller() {
  let doneChecker = false;
  while (doneChecker === false) {
    if (player.fuel < player.FuelTankSise && player.bank >= fuelPrice) {
      player.bank -= fuelPrice;
      player.fuel++;
    }
    else {
      doneChecker = true;
    }
  }
}

/**
 * plays music
 */
function musicBox() {
  let rand = random(4);
  if (!music.track1.isPlaying() && !music.track2.isPlaying() && !music.track3.isPlaying() && !music.track4.isPlaying()) {
    if (rand <= 1) {
      music.track1.play();
    }
    else if (rand <= 2 && rand < 1) {
      music.track2.play();
    }
    else if (rand <= 3 && rand < 2) {
      music.track3.play();
    }
    else {
      music.track4.play();
    }
  }
}

function cargobuyer(location, defualtBuy, defualtSell, stationList){
  let stationNumber = 0;
  let hieghtNeeded = 0;

  for (i=0;i<stationList.length;i++){
    if (stationList[i].name === location){
      stationNumber = i;
      break;
    }
  }

  hieghtNeeded = (stationList[stationNumber].cargo[0].length + stationList[stationNumber].cargo[1].length) * 20;
  rect(width-400, 0, 400, hieghtNeeded);

}

/**
 * renders the 3d visuals of the station
 * @param {*} stationList the list of stations 
 * @param {*} playerLocation the curant player location
 */
function stationRender(stationList, playerLocation){
  let stationNumber;
  orbit += 5;

  for (i=0;i<stationList.length;i++){
    if (stationList[i].name === playerLocation){
      stationNumber = i;
      break;
    }
  }
  orbitControl();
  push();
  directionalLight(200, 200, 200, -1, -1, -1);
  rotateZ(orbit);
  fill(stationList[stationNumber].colourBase[0], stationList[stationNumber].colourBase[1], stationList[stationNumber].colourBase[2]);
  sphere(height/2.5, 20, 20);
  fill(stationList[stationNumber].colourSecond[0], stationList[stationNumber].colourSecond[1], stationList[stationNumber].colourSecond[2]);
  torus(height/2, 30, 17);
  cylinder(29, height/1.001);
  noStroke();
  texture(textureDepth);
  scale(2);
  model(shipModels.titan);
  pop();
  push();
  noStroke();
  rotateZ(orbit);
  translate(0, height/2, 30);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
  model(shipModels.starter);
  pop();
}