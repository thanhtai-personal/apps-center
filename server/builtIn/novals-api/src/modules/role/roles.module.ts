import { RolesController } from '@/controllers/role/roles.controller';
import { RoleEntity } from '@/entities/role.entity';
import { ModuleRefInterceptor } from '@/exceptions';
import { RolesService } from '@/services/roles/roles.service';
import { TypeOrmModule } from '@core-api/nest-typeorm-postgres';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity])
  ],
  providers: [
    RolesService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ModuleRefInterceptor,
    },
  ],
  controllers: [RolesController],
  exports: [RolesService],
})
export class RolesModule { }
