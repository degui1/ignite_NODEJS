import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DaysJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DaysJsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DaysJsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send forgot mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DaysJsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });
  it("Should be able to send a forgotten password mail to user", async () => {
    const sendEmail = jest.spyOn(mailProvider, "sendEmail");

    await usersRepositoryInMemory.create({
      driver_license: "2141387697",
      email: "otten@riukas.lc",
      name: "Sophie Walker",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("otten@riukas.lc");

    expect(sendEmail).toHaveBeenCalled();
  });

  it("Should not be able to send an email if user does not exist", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("otten@riukas.lc"),
    ).rejects.toEqual(new AppError("User does not exist"));
  });

  it("Should be able to create an users token", async () => {
    const generateTokenEmail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create",
    );

    usersRepositoryInMemory.create({
      driver_license: "2063320053",
      email: "ih@to.sv",
      name: "Iva Carroll",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("ih@to.sv");

    expect(generateTokenEmail).toHaveBeenCalled();
  });
});
