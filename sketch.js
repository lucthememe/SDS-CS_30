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
  agriculturalSupplies: "agriculturalSupplies",
  compboard: "compboard",
  waste: "waste"
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
};
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  circle(mouseX, mouseY, 100);
}

function makeCargoList(proType){
  let cargoArray = [[][]];
  let maxCargoBuyAmount;
  let maxCargoSellAmount;
  let cargoBuyAmount;
  let cargoSellAmount;

  MaxcargoBuyAmount = protype[0].length();
  MaxcargoSellAmount = protype[1].length();
  cargoBuyAmount = rand(2, maxCargoBuyAmount);
  cargoSellAmount = rand(2, maxCargoSellAmount);

  for (cargoBuyAmount > 0; cargoBuyAmount--;){
    cargoArray[0].push(proType[0][rand(maxCargoBuyAmount)]);
  }
  
};

