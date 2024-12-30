// star trader
// Luc Coutu
// start date 26/11/2024

let player = {
  x: 500,
  y: 500,
  cargoHoldSize: 10,
  fuelUse: 10,
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

const galaxyXMax = 1000;
const galaxyYMax = 1000;
const defualtCargoAmount = 200;

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

const stationNameComponents ={
  prefix: ["Big", "Small", "Long", "Short", "Wide", "Narrow", "Handsome", "Bald", "Anxious", "Agreeable", "Brave", "Defiant", "Distinct", "Calm", "Charming", "Blushing", "colorful"],
  sufix: ["forest", "art", "rock", "tree", "yard", "tundra", "garden", "desert", "range", "field", "cane", "cube", "murder", "cave", "moose", "beaver", "nerd", "dream", "express", "glade"],
};

const stationType ={
  smelter: [[cargo.water, cargo.processedFood, cargo.distilledSpirits], [cargo.iron, cargo.copper, cargo.tungsten, cargo.aluminum, cargo.waste]],
  shipYard: [[cargo.RMC, cargo.constructionMaterials, cargo.compboard, cargo.tungsten], [cargo.waste]],
  scrapYard: [[cargo.water, cargo.processedFood, cargo.distilledSpirits], [cargo.iron, cargo.RMC, cargo.constructionMaterials, cargo.waste]],
  scienceLab: [[cargo.water, cargo.processedFood, cargo.compboard], [cargo.waste, cargo.quantainium, cargo.agriculturalSupplies]],
  eggriculture: [[cargo.waste, cargo.constructionMaterials, cargo.agriculturalSupplies], [cargo.water, cargo.processedFood, cargo.distilledSpirits, cargo.waste]],
  manufacturingHub: [[cargo.iron, cargo.copper, cargo.aluminum], [cargo.compboard, cargo.waste]],
};

let genratedstations = [];

//this class holds info for all stations and can generate new stations 
class CreateStation {
  constructor(name, x, y, preset, productionType){
    this.name = name;
    this.x = x;
    this.y = y;
    this.preset = preset;
    this.productionType = productionType;
    this.cargo = productionType;

  }

  /**
   * generates a new random station
   */
  GenrateRandomStation(){
    this.CreateCargoList();
    this.CreateStationCoordinates();
    this.CreateStationName();
  }

  /**
   * uses the makeCargoList function to generate a cargo list
   */
  CreateCargoList(){
    this.cargo = makeCargoList(this.cargo);
  }

  /**
   * generate a station name 
   */
  CreateStationName(){
    let nameHolder;
    let newName = false;
    while (newName === false){
      nameHolder = stationNameComponents.prefix[Math.round(random(stationNameComponents.prefix.length-1))] + " " + stationNameComponents.sufix[Math.round(random(stationNameComponents.sufix.length-1))] + " station";
      newName = true;
      for (let i = 0; i < genratedstations.length; i++){
        if (nameHolder === genratedstations[i].name){
          newName = false;
        }
      }
    }
    this.name = nameHolder;
  }

  /**
   * randomly generate station coordenates
   */
  CreateStationCoordinates(){
    let newCoordinates = false;
    let coordinateXHolder;
    let coordinateYHolder;
    while (newCoordinates === false){
      coordinateYHolder = Math.round(random(galaxyXMax));
      coordinateXHolder = Math.round(random(galaxyYMax));
      newCoordinates = true;
      for (let i = 0; i < genratedstations.length; i++){
        if (coordinateXHolder === genratedstations[i].x && coordinateYHolder === genratedstations[i].y){
          newCoordinates = false;
        }
      }
    }
    this.x = coordinateXHolder;
    this.y = coordinateYHolder;
  }
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  genratedstations.push(new CreateStation("Test station", 500, 500, true, stationType.smelter));
  for (let i=0;i<20;i++){
    gernateStation();
    console.log(stationInfoCheck(genratedstations[i].x, genratedstations[i].y, genratedstations));
  }
  console.log(stationDistCheck(player.x, player.y, genratedstations))
}

function draw() {
  background(220);
  circle(mouseX, mouseY, 100);
}

/**
 * generats a cargo list depending on station type
 * @param {*} proType the type of station to genrated a cargo list for
 * @returns  2 arrays of cargo that the station will buy and sell
 */
function makeCargoList(proType){
  let cargoArray = [];
  let tempArray = [];
  let tempMap = new Map;
  let tempCargo;
  let maxCargoBuyAmount;
  let maxCargoSellAmount;
  let cargoBuyAmount;
  let cargoSellAmount;

  maxCargoBuyAmount = proType[0].length-1;
  maxCargoSellAmount = proType[1].length-1;

  cargoBuyAmount = Math.round(random(2, maxCargoBuyAmount));
  cargoSellAmount = Math.round(random(2, maxCargoSellAmount));

  for (cargoBuyAmount; cargoBuyAmount > 0; cargoBuyAmount--){
    tempCargo = proType[0][Math.round(random(maxCargoBuyAmount))];
    if (tempMap.has(tempCargo)){
      tempMap.set(tempCargo, tempMap.get(tempCargo)+defualtCargoAmount);
    }
    else{
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

  for (cargoSellAmount; cargoSellAmount > 0; cargoSellAmount--){
    tempCargo = proType[1][Math.round(random(maxCargoSellAmount))];
    if (tempMap.has(tempCargo)){
      tempMap.set(tempCargo, tempMap.get(tempCargo)+defualtCargoAmount);
    }
    else{
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
function gernateStation(){
  let stationNumber = genratedstations.length;
  let stationRand = random(6);
  let stationRandType = null;

  if (stationRand <= 1){
    stationRandType = stationType.eggriculture;
  }
  else if (stationRand <= 2 && stationRand < 1){
    stationRandType = stationType.manufacturingHub;
  }
  else if (stationRand <= 3 && stationRand < 2){
    stationRandType = stationType.scienceLab;
  }
  else if (stationRand <= 4 && stationRand < 3){
    stationRandType = stationType.scrapYard;
  }
  else if (stationRand <= 5 && stationRand < 4){
    stationRandType = stationType.shipYard;
  }
  else{
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
function stationInfoCheck(playerX, playerY, stationList){
  let stationName ;
  let stationCargoBuy ;
  let stationCargoSell ;
  for (let i = 0; i < stationList.length; i++){
    if (playerX === stationList[i].x && playerY === stationList[i].y){
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
function stationDistCheck(playerX, playerY, stationList){
  let distArray = [];
  let stationXHolder ;
  let stationYHolder ;
  let stationNameHolder;
  let xDist;
  let yDist;
  let totalDist
  for(i = 0; i < stationList.length; i++){
    if (playerX != stationList[i].x && !playerY != stationList[i].y){
      stationXHolder = stationList[i].x;
      stationYHolder = stationList[i].y;
      stationNameHolder = stationList[i].name;
      
      xDist = Math.abs(playerX - stationXHolder);
      yDist = Math.abs(playerY - stationYHolder);
      totalDist = Math.sqrt(xDist ** 2 + yDist ** 2);
      totalDist = Math.round(totalDist);
      distArray.push([stationNameHolder, totalDist, totalDist*player.fuelUse])
    }
  }
  return distArray;
}
