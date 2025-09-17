import { Injectable, NotFoundException } from "@nestjs/common";
import { Car } from "./interface/car";
import { carStatus } from "./enum/carStatus.enum";

@Injectable()
export class CarsService {
  private cars: Array<Car> = [
    {
      model: "Astra Sedan Advantage",
      make: "Chevrolet",
      year: 2007,
      colour: "Preto",
      status: carStatus.AVAILABLE,
      id: 1,
    },
    {
      model: "Ford KA",
      make: "Ford",
      year: 2018,
      colour: "Cinza",
      status: carStatus.SOLD,
      id: 2,
    },
    {
      model: "Voyage 1.6 MPFI",
      make: "Volkswagen",
      year: 2022,
      colour: "Preto",
      status: carStatus.SOLD,
      id: 3,
    },
  ];

  create(car: any): void {
    car.id = this.cars[this.cars.length - 1].id + 1;
    this.cars.push(car);
  }

  findAll(filter?: string, page: number = 1) {
    let result = this.cars;

    if (filter) {
      result = result.filter((car) => {
        return car.model.toLowerCase().includes(filter.toLowerCase());
      });
    }

    const pageSize = 5;
    return result.slice((page - 1) * pageSize, page * pageSize);
  }

  findOne(id: number) {
    const car: Car | undefined = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException("Carro não encontrado.");
    return car;
  }

  update(id: number, car: Car): void {
    this.cars[id - 1] = car;
  }

  remove(id: number) {
    this.cars = this.cars.filter((car) => car.id != id);
  }
}
