// import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

// @injectable()
class ListCarsUseCase {
  constructor(
    // @inject("CarsRepository")
    private carsRepository: ICarsRepository,
  ) {}

  async execute(): Promise<Car[]> {
    const cars = this.carsRepository.findAvailable();
    return cars;
  }
}

export { ListCarsUseCase };
