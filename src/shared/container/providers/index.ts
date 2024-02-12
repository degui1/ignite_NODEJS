import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DaysJsDateProvider } from "./DateProvider/implementations/DaysJsDateProvider";

container.registerSingleton<IDateProvider>(
  "DaysJsDateProvider",
  DaysJsDateProvider,
);
