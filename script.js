class Traveler {
  constructor(name) {
    this.name = name
    this._food = 1
    this._isHealthy = true
  }

  set food(value) {
    this._food = value
  }
  get food() {
    return this._food
  }

  set healthy(value) {
    this._isHealthy = value
  }
  get healthy() {
    return this._isHealthy
  }

  hunt() {
    this.food += 2;
    console.log(
      `Parabéns, ${this.name}! Agora você possui ${this.food} alimentos.`
    );
    return this.food;
  }

  eat() {
    if (this.food > 0) {
      this.food -= 1;
      console.log(
        `${this.name}, você agora possui ${this.food} alimentos e permanece saudável`
      );
      return this.food;
    }
    console.log(
      `${this.name}, você não possui nenhum tipo de alimentos, portanto agora você está doente. :(`
    );
    return (this.isHealthy = false);
  }
}

class Wagon {
  constructor(capacity) {
    this.capacity = capacity;
    this.passengersList = [];
  }

  getAvailableSeatCount() {
    return this.capacity - this.passengersList.length === 1
      ? "A carroça tem um assento livre."
      : `A carroça tem ${
          this.capacity - this.passengersList.length
        } assentos livres.`;
  }

  join(oneTraveler) {
    if (this.passengersList.length < this.capacity) {
      return this.passengersList.push(oneTraveler);
    }
    return "Não possui espaço na carroça!";
  }

  shouldQuarantine() {
    if (this.passengersList.some((elm) => elm.isHealthy === false)) {
      console.log(
        `Um dos passageiros está doente, portanto vocês estão de quarentena!`
      );
      return true;
    }
    console.log("Ninguém está doente. Pode seguir viagem!");
    return false;
  }

  totalFood() {
    return this.passengersList.reduce((acc, { food }) => acc + food, 0);
  }
}

// Criar uma carroça que comporta 2 pessoas
let wagon = new Wagon(2);
// Criar três viajantes
let henrietta = new Traveler("Henrietta");
let juan = new Traveler("Juan");
let maude = new Traveler("Maude");

console.log(`${wagon.getAvailableSeatCount()} should be 2`);

wagon.join(henrietta);
console.log(`${wagon.getAvailableSeatCount()} should be 1`);

wagon.join(juan);
wagon.join(maude); // Não tem espaço para ela!
console.log(`${wagon.getAvailableSeatCount()} should be 0`);

henrietta.hunt(); // pega mais comida
juan.eat();
juan.eat(); // juan agora está com fome (doente)

console.log(`${wagon.shouldQuarantine()} should be true since juan is sick`);
console.log(`${wagon.totalFood()} should be 3`);
