import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DaysJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DaysJsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let daysJsDateProvider: DaysJsDateProvider;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

let dayAdd24: Date;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    daysJsDateProvider = new DaysJsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      daysJsDateProvider,
    );
    dayAdd24 = daysJsDateProvider.dayAdd24();
  });

  it("Should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "123456",
      car_id: "121212",
      expected_return_date: dayAdd24,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rental if there is another rental opened to the same user", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123456",
        car_id: "121212",
        expected_return_date: dayAdd24,
      });

      await createRentalUseCase.execute({
        user_id: "123456",
        car_id: "3333",
        expected_return_date: dayAdd24,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental if there is another rental opened to the same car", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "test",
        expected_return_date: dayAdd24,
      });

      await createRentalUseCase.execute({
        user_id: "54321",
        car_id: "test",
        expected_return_date: dayAdd24,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental with invalid date", () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "123",
        car_id: "test",
        expected_return_date: daysJsDateProvider.dateNow(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
