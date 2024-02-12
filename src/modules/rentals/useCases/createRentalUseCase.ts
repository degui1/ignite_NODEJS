import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(
    private rentalsRepository: IRentalsRepository,
    private dateProvider: IDateProvider,
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimalHoursToRentalACar = 24;

    const carNotAvailable =
      await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (carNotAvailable) throw new AppError("Car is not available");

    const rentalOpenToUser =
      await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (rentalOpenToUser)
      throw new AppError("There is a rental in progress for this user!");

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    const compare = this.dateProvider.compareInHours(
      this.dateProvider.dateNow(),
      expected_return_date,
    );

    if (compare < minimalHoursToRentalACar)
      throw new AppError("The rental hours could not be less than 24 hours");

    return rental;
  }
}

export { CreateRentalUseCase };
