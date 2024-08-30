import { CreateNovalDto } from '@/dtos/novals/noval.create.dto';
import { UpdateNovalDto } from '@/dtos/novals/noval.update.dto';
import { NovalEntity } from '@/entities/noval.entity';
import { NovalCreateDTOToEntityMapper } from '@/mappers/novals/noval.create.mapper';
import { NovalEntityToNovalResponse } from '@/mappers/novals/noval.response.mapper';
import { DeepPartial, InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { IPagination, IPagingFilter, INovalFilter, INovalResponse } from '@core-ui/novals-types';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class NovalsService {
  constructor(
    @InjectRepository(NovalEntity)
    private novalsRepository: Repository<NovalEntity>,
  ) { }


  async findAll(filter: IPagingFilter & INovalFilter): Promise<IPagination<INovalResponse>> {
    throw new Error('Error finding noval');
  }

  async findOne(id: number): Promise<INovalResponse | null> {
    throw new Error('Error finding noval');
  }

  async update(novalId: number, updateNovalDto: UpdateNovalDto) {
    const noval = await this.novalsRepository.findOne({
      where: {
        id: novalId,
      },
    });
    if (!noval) {
      throw new NotFoundException('Noval not found');
    }
    const { id, ...nestedData } = updateNovalDto;
    Object.assign(noval, nestedData);

    const rsNoval = await this.novalsRepository.save(noval);
    return NovalEntityToNovalResponse.map(rsNoval);
  }

  async patchUpdate(novalId: number, updateNovalDto: DeepPartial<UpdateNovalDto>) {
    const noval = await this.novalsRepository.findOne({
      where: { id: novalId },
    });
    if (!noval) {
      throw new Error('Noval not found');
    }
    const { id, ...nestedData } = updateNovalDto;
    Object.assign(noval, nestedData);

    const rsNoval = await this.novalsRepository.save(noval);
    return NovalEntityToNovalResponse.map(rsNoval);
  }

  async add(requestedNoval: CreateNovalDto, isEntity: boolean = false) {
    try {
      const noval = this.novalsRepository.create(NovalCreateDTOToEntityMapper.map(requestedNoval));
      await this.novalsRepository.save(noval);
      return isEntity ? noval : NovalEntityToNovalResponse.map(noval);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.novalsRepository.delete(id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}