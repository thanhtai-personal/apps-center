import { Module } from "@nestjs/common";
import { serviceMapper } from "@core-domain/user-management";
import { registerServices } from "@core-module/nestjs-utils";

const serviceProviders = registerServices(serviceMapper);

@Module({
  providers: serviceProviders,
  exports: serviceProviders,
})
export class UserManagementModule {}
