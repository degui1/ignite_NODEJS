import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DaysJsDateProvider } from "./DateProvider/implementations/DaysJsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";

container.registerSingleton<IDateProvider>(
  "DaysJsDateProvider",
  DaysJsDateProvider,
);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider(),
);
