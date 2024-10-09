import { InjectRepository, Repository } from "@core-api/nest-typeorm-postgres";
import { NEST_COMMON, NEST_JWT } from "@core-api/nest-core";
import { UserEntity } from "@/entities";

const { Injectable } = NEST_COMMON

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private jwtService: NEST_JWT.JwtService,
  ) { }
  
}
