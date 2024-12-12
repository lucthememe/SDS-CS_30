// star trader
// Luc Coutu
// start date 26/11/2024

let player = {
  curantPlayerstation: null,
  cargoHoldSize: 10,
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
};

galaxyXMax = 1000;
galaxyYMax = 1000;

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
  sufix: ["forest", "art", "rock", "tree", "yard", "tundra", "garden", "desert", "range", "field", "cane", "cube", "murder", "cave", "moose", "beaver", "nerd"],
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


class CreateStation {
  constructor(name, x, y, preset, productionType){
    this.name = name;
    this.x = x;
    this.y = y;
    this.preset = preset;
    this.productionType = productionType;

  }

  CreateCargoList(){
    makeCargoList(this.productionType);
  }

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

  CreateStationCoordinates(){
    let newCoordinates = false;
    let coordinateXHolder;
    let coordinateYHolder;
    while (newCoordinates === false){
      coordinateYHolder = Math.round(random(galaxyXMax));
      coordinateXHolder = Math.round(random(galaxyYMax));
      newCoordinates = true;
      for (let i = 0; i < genratedstations.length; i++){
        if (coordinateXHolder === genratedstations[i].x){
          newCoordinates = false;
        }
      }
      //fix coord check for same x y
      for (let i = 0; i < genratedstations.length; i++){
        if (coordinateYHolder === genratedstations[i].y){
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
  let n = genratedstations.length;
  for (let i = 0; i < 10; i++){
    genratedstations.push(new CreateStation("", 0, 0, false, stationType.manufacturingHub));
    if (genratedstations[i+n].preset === false){
      genratedstations[i+n].CreateStationName();
      genratedstations[i+n].CreateCargoList();
      genratedstations[i+n].CreateStationCoordinates();
    }

  }
  console.log(genratedstations);
}

function draw() {
  background(220);
  circle(mouseX, mouseY, 100);
}

function makeCargoList(proType){
  let cargoArray = [];
  let tempArray = [];
  let maxCargoBuyAmount;
  let maxCargoSellAmount;
  let cargoBuyAmount;
  let cargoSellAmount;

  maxCargoBuyAmount = proType[0].length-1;
  maxCargoSellAmount = proType[1].length-1;

  //fix always 2 issue
  cargoBuyAmount = Math.round(random(2, maxCargoBuyAmount));
  cargoSellAmount = Math.round(random(2, maxCargoSellAmount));

  for (cargoBuyAmount; cargoBuyAmount > 0; cargoBuyAmount--){
    tempArray.push(proType[0][Math.round(random(maxCargoBuyAmount))]);
  }
  cargoArray.push(tempArray);
  tempArray = [];
  
  for (cargoSellAmount; cargoSellAmount > 0; cargoSellAmount--){
    tempArray.push(proType[1][Math.round(random(maxCargoSellAmount))]);
  }
  cargoArray.push(tempArray);
  tempArray = [];

  return cargoArray;
};

