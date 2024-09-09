import { CreateNovalDto } from '@/dtos/novals/noval.create.dto';
import { UpdateNovalDto } from '@/dtos/novals/noval.update.dto';
import { NovalEntity } from '@/entities/noval.entity';
import { NovalCreateDTOToEntityMapper } from '@/mappers/novals/noval.create.mapper';
import { NovalEntityToNovalResponse } from '@/mappers/novals/noval.response.mapper';
import { DeepPartial, InjectRepository, IsNull, Not, Repository } from '@core-api/nest-typeorm-postgres';
import { IPagination, IPagingFilter, INovalFilter, INovalResponse } from '@core-ui/novals-types';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class NovalsService {
  constructor(
    @InjectRepository(NovalEntity)
    private novalsRepository: Repository<NovalEntity>,
  ) { }


  async findAll(filter: IPagingFilter & INovalFilter): Promise<IPagination<INovalResponse>> {
    const where: any = {};
    if (filter.authorId) {
      where.authorId = filter.authorId
    }
    const novals = await this.novalsRepository.find({
      where
    });
    return {
      data: NovalEntityToNovalResponse.maps(novals),
      limit: filter.limit,
      offset: filter.offset,
      total: novals.length,
    } as IPagination<INovalResponse>;
  }

  async getRanking(limit: number): Promise<{
    topView: INovalResponse[];
    topVote: INovalResponse[];
    topLike: INovalResponse[];
    topFollow: INovalResponse[];
  }> {
    const topView = await this.novalsRepository.find({
      take: limit,
      where: {
        view: Not(IsNull())
      },
      order: {
        view: 'DESC' as const
      }
    });
    console.log("topView", topView);
    
    if (topView.length === 0) {
      console.error("Không tìm thấy bản ghi nào có giá trị view > 0");
    }

    const topVote = await this.novalsRepository.find({
      take: limit,
      where: {
        suggest: Not(IsNull())
      },
      order: {
        suggest: 'DESC' as const
      }
    });

    const topLike = await this.novalsRepository.find({
      take: limit,
      where: {
        like: Not(IsNull())
      },
      order: {
        like: 'DESC' as const
      }
    });

    const topFollow = await this.novalsRepository.find({
      take: limit,
      where: {
        follow: Not(IsNull())
      },
      order: {
        follow: 'DESC' as const
      }
    });
    return {
      topView: NovalEntityToNovalResponse.maps(topView),
      topVote: NovalEntityToNovalResponse.maps(topVote),
      topLike: NovalEntityToNovalResponse.maps(topLike),
      topFollow: NovalEntityToNovalResponse.maps(topFollow),
    };
  }

  async findOne(id: number): Promise<INovalResponse | null> {
    const noval = await this.novalsRepository.findOne({ where: { id: id } });

    return noval ? NovalEntityToNovalResponse.map(noval) : noval;
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