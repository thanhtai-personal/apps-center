import { Provider, Type } from "@nestjs/common";
import { IService } from "@ttt-module/infra";

type ServiceMapper = Record<string, Type<IService>>;

export const registerServices = (serviceMapper: ServiceMapper): Provider[] =>
  Object.keys(serviceMapper)
    .map((serviceKey) => {
      const Service = serviceMapper[serviceKey];
      return [
        {
          provide: serviceKey,
          useFactory(serviceInstance: IService) {
            return serviceInstance;
          },
          inject: [Service],
        },
        Service,
      ];
    })
    .flat() as Provider[];
