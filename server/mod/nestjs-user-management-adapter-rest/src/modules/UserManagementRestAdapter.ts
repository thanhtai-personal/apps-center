import { Module } from "@nestjs/common";
import { serviceMapper } from "@core-domain/user-management";
import { registerServices } from "@core-module/nestjs-utils";
import * as controllers from "~/controllers";

const serviceProviders = registerServices(serviceMapper);

@Module({
  providers: serviceProviders,
  exports: serviceProviders,
  controllers: Object.values(controllers),
})
export class UserManagementRestAdapter {}
