import { Module } from "@nestjs/common";
import { serviceMapper } from "@ttt-domain/user-management";
import { registerServices } from "@ttt-module/nestjs-utils";

const serviceProviders = registerServices(serviceMapper);

@Module({
  providers: serviceProviders,
  exports: serviceProviders,
})
export class UserManagementModule {}
