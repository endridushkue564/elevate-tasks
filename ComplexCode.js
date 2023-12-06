/* 
   Filename: ComplexCode.js
   Description: This code demonstrates a complex and sophisticated JavaScript program that solves a mathematical optimization problem called the Traveling Salesman Problem (TSP).
*/

// Define a class to represent a city with its coordinates
class City {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  distanceTo(city) {
    const xDistance = Math.abs(this.x - city.x);
    const yDistance = Math.abs(this.y - city.y);
    return Math.sqrt(xDistance ** 2 + yDistance ** 2);
  }

  toString() {
    return `(${this.x}, ${this.y})`;
  }
}

// Define a class to represent the population of possible routes
class Population {
  constructor(cities, populationSize) {
    this.routes = Array.from({ length: populationSize }, () => this.shuffle(cities));
  }

  shuffle(array) {
    const shuffled = array.slice();
    let currentIndex = shuffled.length;
    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [shuffled[currentIndex], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[currentIndex]];
    }
    return shuffled;
  }

  getFittest() {
    let fittest = this.routes[0];
    for (let i = 1; i < this.routes.length; i++) {
      if (this.getFitness(this.routes[i]) > this.getFitness(fittest)) {
        fittest = this.routes[i];
      }
    }
    return fittest;
  }

  getFitness(route) {
    let totalDistance = 0;
    for (let i = 0; i < route.length - 1; i++) {
      const fromCity = route[i];
      const toCity = route[i + 1];
      totalDistance += fromCity.distanceTo(toCity);
    }
    return 1 / totalDistance;
  }
}

// Define the main function to solve the TSP using a genetic algorithm
function solveTSP(cities, populationSize, generations) {
  let population = new Population(cities, populationSize);

  for (let generation = 0; generation < generations; generation++) {
    population.routes.sort((a, b) => population.getFitness(b) - population.getFitness(a));

    const eliteSize = Math.floor(populationSize * 0.1);
    const parents = population.routes.slice(0, eliteSize);

    const matingPool = [];
    population.routes.slice(eliteSize).forEach((route) => {
      const fitness = population.getFitness(route);
      const normalizedFitness = fitness / population.getFitness(population.routes[0]);
      const matingPoolSize = Math.ceil(normalizedFitness * populationSize);
      matingPool.push(...Array.from({ length: matingPoolSize }, () => route));
    });

    const crossover = (parent1, parent2) => {
      const child = Array.from({ length: parent1.length });
      const startPos = Math.floor(Math.random() * parent1.length);
      const endPos = Math.floor(Math.random() * parent1.length);
      const [start, end] = startPos < endPos ? [startPos, endPos] : [endPos, startPos];
      
      for (let i = start; i <= end; i++) {
        child[i] = parent1[i];
      }

      for (let i = 0; i < parent2.length; i++) {
        if (!child.includes(parent2[i])) {
          for (let j = 0; j < child.length; j++) {
            if (child[j] === undefined) {
              child[j] = parent2[i];
              break;
            }
          }
        }
      }

      return child;
    };

    const breedPopulation = (pool, parents) => {
      const shuffledParents = parents.slice();
      let newPopulation = [];

      pool.forEach((genome) => {
        const parent1 = shuffledParents[Math.floor(Math.random() * shuffledParents.length)];
        const parent2 = shuffledParents[Math.floor(Math.random() * shuffledParents.length)];
        const child = crossover(parent1, parent2);
        newPopulation.push(child);
      });

      return newPopulation;
    };

    population.routes = breedPopulation(matingPool, parents);
  }

  return population.getFittest();
}

// Define the cities as an array of City objects
const cities = [
  new City(60, 200),
  new City(180, 200),
  new City(80, 180),
  new City(140, 180),
  new City(20, 160),
  new City(100, 160),
  new City(200, 160),
  new City(140, 140),
  new City(40, 120),
  new City(100, 120),
  new City(180, 100),
  new City(60, 80),
  new City(120, 80),
  new City(180, 60),
  new City(20, 40),
  new City(100, 40),
  new City(200, 40),
  new City(20, 20),
  new City(60, 20),
  new City(160, 20),
];

// Define the size of the population and the number of generations
const populationSize = 50;
const generations = 1000;

// Solve the TSP and print the fittest route
console.log("Fittest Route:", solveTSP(cities, populationSize, generations).join(' -> '));