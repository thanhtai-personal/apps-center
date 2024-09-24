import { CreateRoleDto } from '@/dtos/roles/role.create.dto';
import { UpdateRoleDto } from '@/dtos/roles/role.update.dto';
import { RoleEntity } from '@/entities/role.entity';
import { RoleCreateDTOToEntityMapper } from '@/mappers/roles/role.create.mapper';
import { RoleEntityToRoleResponse } from '@/mappers/roles/role.response.mapper';
import { DeepPartial, InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { IPagination, IPagingFilter, IRoleFilter, IRoleResponse } from '@core-ui/jobs-listing-types';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private rolesRepository: Repository<RoleEntity>,
  ) { }


  async findAll(filter: IPagingFilter & IRoleFilter): Promise<IPagination<IRoleResponse>> {
    throw new Error('Error finding role');
  }

  async findOne(id: number): Promise<IRoleResponse | null> {
    throw new Error('Error finding role');
  }

  async update(roleId: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.rolesRepository.findOne({
      where: {
        id: roleId,
      },
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    const { id, ...nestedData } = updateRoleDto;
    Object.assign(role, nestedData);

    const rsRole = await this.rolesRepository.save(role);
    return RoleEntityToRoleResponse.map(rsRole);
  }

  async patchUpdate(roleId: number, updateRoleDto: DeepPartial<UpdateRoleDto>) {
    const role = await this.rolesRepository.findOne({
      where: { id: roleId },
    });
    if (!role) {
      throw new Error('Role not found');
    }
    const { id, ...nestedData } = updateRoleDto;
    Object.assign(role, nestedData);

    const rsRole = await this.rolesRepository.save(role);
    return RoleEntityToRoleResponse.map(rsRole);
  }

  async add(requestedRole: CreateRoleDto, isEntity: boolean = false) {
    try {
      const role = this.rolesRepository.create(RoleCreateDTOToEntityMapper.map(requestedRole));
      await this.rolesRepository.save(role);
      return isEntity ? role : RoleEntityToRoleResponse.map(role);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.rolesRepository.delete(id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}