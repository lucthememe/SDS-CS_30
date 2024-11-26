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
};

const stationType ={
  smelter: [[cargo.water, cargo.processedFood, cargo.distilledSpirits], [cargo.iron, cargo.copper, cargo.tungsten, cargo.aluminum]],
  scrapYard: [[cargo.water, cargo.processedFood, cargo.distilledSpirits], [cargo.iron, cargo.RMC, cargo.constructionMaterials]]
};

let genratedstations = [];


class Createstation {
  constructor(name, x, y, preset, productionType){
    this.name = name;
    this.numberOfCargos = random(5, 10);
    this.x = x;
    this.y = y;
    this.preset = preset;
    this.productionType = productionType;

  }

  CreateCargoList(numOfCargo){
    makeCargoList(numOfCargo);
  }
};
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  circle(mouseX, mouseY, 100);
}

function makeCargoList(cargoAmount, proType){
  let cargoArray = [];
  for (cargoAmount > 0; cargoAmount--;){
    
  }
}