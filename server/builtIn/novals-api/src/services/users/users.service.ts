import { CreateUserDto } from '@/dtos/users/user.create.dto';
import { UpdateUserDto } from '@/dtos/users/user.update.dto';
import { UserEntity } from '@/entities/user.entity';
import { UserCreateDTOToEntityMapper } from '@/mappers/users/user.create.mapper';
import { UserEntityToUserResponse } from '@/mappers/users/user.response.mapper';
import { DeepPartial, InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { IPagination, IPagingFilter, IUserFilter, IUserResponse } from '@core-ui/novals-types';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) { }


  async findAll(filter: IPagingFilter & IUserFilter): Promise<IPagination<IUserResponse>> {
    throw new Error('Error finding user');
  }

  async findOne(id: number): Promise<IUserResponse | null> {
    throw new Error('Error finding user');
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { id, ...nestedData } = updateUserDto;
    Object.assign(user, nestedData);

    const rsUser = await this.usersRepository.save(user);
    return UserEntityToUserResponse.map(rsUser);
  }

  async patchUpdate(userId: number, updateUserDto: DeepPartial<UpdateUserDto>) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const { id, ...nestedData } = updateUserDto;
    Object.assign(user, nestedData);

    const rsUser = await this.usersRepository.save(user);
    return UserEntityToUserResponse.map(rsUser);
  }

  async add(requestedUser: CreateUserDto, isEntity: boolean = false) {
    try {
      const user = this.usersRepository.create(UserCreateDTOToEntityMapper.map(requestedUser));
      await this.usersRepository.save(user);
      return isEntity ? user : UserEntityToUserResponse.map(user);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.usersRepository.delete(id);
    } catch (error: any) {
      // throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}