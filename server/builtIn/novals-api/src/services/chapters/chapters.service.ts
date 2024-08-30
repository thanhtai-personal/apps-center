import { CreateChapterDto } from '@/dtos/chapters/chapter.create.dto';
import { UpdateChapterDto } from '@/dtos/chapters/chapter.update.dto';
import { ChapterEntity } from '@/entities/chapter.entity';
import { ChapterCreateDTOToEntityMapper } from '@/mappers/chapters/chapter.create.mapper';
import { ChapterEntityToChapterResponse } from '@/mappers/chapters/chapter.response.mapper';
import { DeepPartial, InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { IPagination, IPagingFilter, IChapterFilter, IChapterResponse } from '@core-ui/novals-types';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectRepository(ChapterEntity)
    private chaptersRepository: Repository<ChapterEntity>,
  ) { }


  async findAll(filter: IPagingFilter & IChapterFilter): Promise<IPagination<IChapterResponse>> {
    throw new Error('Error finding chapter');
  }

  async findOne(id: number): Promise<IChapterResponse | null> {
    throw new Error('Error finding chapter');
  }

  async update(chapterId: number, updateChapterDto: UpdateChapterDto) {
    const chapter = await this.chaptersRepository.findOne({
      where: {
        id: chapterId,
      },
    });
    if (!chapter) {
      throw new NotFoundException('Chapter not found');
    }
    const { id, ...nestedData } = updateChapterDto;
    Object.assign(chapter, nestedData);

    const rsChapter = await this.chaptersRepository.save(chapter);
    return ChapterEntityToChapterResponse.map(rsChapter);
  }

  async patchUpdate(chapterId: number, updateChapterDto: DeepPartial<UpdateChapterDto>) {
    const chapter = await this.chaptersRepository.findOne({
      where: { id: chapterId },
    });
    if (!chapter) {
      throw new Error('Chapter not found');
    }
    const { id, ...nestedData } = updateChapterDto;
    Object.assign(chapter, nestedData);

    const rsChapter = await this.chaptersRepository.save(chapter);
    return ChapterEntityToChapterResponse.map(rsChapter);
  }

  async add(requestedChapter: CreateChapterDto, isEntity: boolean = false) {
    try {
      const chapter = this.chaptersRepository.create(ChapterCreateDTOToEntityMapper.map(requestedChapter));
      await this.chaptersRepository.save(chapter);
      return isEntity ? chapter : ChapterEntityToChapterResponse.map(chapter);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.chaptersRepository.delete(id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}