import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const specificationsRepository = new SpecificationsRepository();

const crateSpecificationUseCase = new CreateSpecificationUseCase(
  specificationsRepository,
);

const createSpecificationController = new CreateSpecificationController(
  crateSpecificationUseCase,
);

export { createSpecificationController };
