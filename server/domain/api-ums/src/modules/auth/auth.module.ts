import { AuthController } from '@/controllers/auth/auth.controller';
import { AuthService } from '@/services/auth/auth.service';
import { JwtConfig } from '@/config';
import { NEST_COMMON, NEST_JWT } from "@core-api/nest-core";
import { TypeOrmModule } from "@core-api/nest-typeorm-postgres";
import { UserEntity } from "@/entities";
import { CryptoModule } from "@/modules/encrypt/encrypt.module";

const { Module } = NEST_COMMON
const { JwtModule } = NEST_JWT

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JwtConfig.JWT_SECRET,
      signOptions: { expiresIn: JwtConfig.JWT_EXPIRATION },
    }),
    TypeOrmModule.forFeature([UserEntity]),
    CryptoModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService
  ],
  exports: [AuthService]
})
export class AuthModule { }
