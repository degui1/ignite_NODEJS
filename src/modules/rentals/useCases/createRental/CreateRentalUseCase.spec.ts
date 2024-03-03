import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DaysJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DaysJsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let daysJsDateProvider: DaysJsDateProvider;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

let dayAdd24: Date;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    daysJsDateProvider = new DaysJsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      daysJsDateProvider,
      carsRepositoryInMemory,
    );
    dayAdd24 = daysJsDateProvider.dayAdd24();
  });

  it("Should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "Brand test",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "123456",
      car_id: car.id,
      expected_return_date: dayAdd24,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rental if there is another rental opened to the same user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "1111",
      expected_return_date: dayAdd24,
      user_id: "123456",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "123456",
        car_id: "3333",
        expected_return_date: dayAdd24,
      }),
    ).rejects.toEqual(
      new AppError("There is a rental in progress for this user!"),
    );
  });

  it("Should not be able to create a new rental if there is another rental opened to the same car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "test",
      expected_return_date: dayAdd24,
      user_id: "123456",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "54321",
        car_id: "test",
        expected_return_date: dayAdd24,
      }),
    ).rejects.toEqual(new AppError("Car is not available"));
  });

  it("Should not be able to create a new rental with invalid date", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: daysJsDateProvider.dateNow(),
      }),
    ).rejects.toEqual(
      new AppError("The rental hours could not be less than 24 hours"),
    );
  });
});
