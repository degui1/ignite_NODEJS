import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

import { IRentalsRepository } from "../repositories/IRentalsRepository";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<void> {
    const carNotAvailable =
      await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (carNotAvailable) throw new AppError("Car is not available");

    const rentalOpenToUser =
      await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (rentalOpenToUser)
      throw new AppError("There is a rental in progress for this user!");
  }
}

export { CreateRentalUseCase };
