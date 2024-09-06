import { CreateAuthorDto } from '@/dtos/authors/author.create.dto';
import { UpdateAuthorDto } from '@/dtos/authors/author.update.dto';
import { AuthorEntity } from '@/entities/author.entity';
import { AuthorCreateDTOToEntityMapper } from '@/mappers/authors/author.create.mapper';
import { AuthorEntityToAuthorResponse } from '@/mappers/authors/author.response.mapper';
import { DeepPartial, InjectRepository, Repository } from '@core-api/nest-typeorm-postgres';
import { IPagination, IPagingFilter, IAuthorFilter, IAuthorResponse } from '@core-ui/novals-types';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(AuthorEntity)
    private authorsRepository: Repository<AuthorEntity>,
  ) { }

  async findAll(filter: IPagingFilter & IAuthorFilter): Promise<IPagination<IAuthorResponse>> {
    const authors = await this.authorsRepository.find();
    return {
      data: AuthorEntityToAuthorResponse.maps(authors),
      limit: 99999999,
      offset: 0,
      total: authors.length,
    } as IPagination<IAuthorResponse>;
  }

  async findOne(id: number): Promise<IAuthorResponse | null> {
    const author = await this.authorsRepository.findOne({ where: { id: id } });

    return author ? AuthorEntityToAuthorResponse.map(author) : author;
  }

  async update(authorId: number, updateAuthorDto: UpdateAuthorDto) {
    const author = await this.authorsRepository.findOne({
      where: {
        id: authorId,
      },
    });
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    const { id, ...nestedData } = updateAuthorDto;
    Object.assign(author, nestedData);

    const rsAuthor = await this.authorsRepository.save(author);
    return AuthorEntityToAuthorResponse.map(rsAuthor);
  }

  async patchUpdate(authorId: number, updateAuthorDto: DeepPartial<UpdateAuthorDto>) {
    const author = await this.authorsRepository.findOne({
      where: { id: authorId },
    });
    if (!author) {
      throw new Error('Author not found');
    }
    const { id, ...nestedData } = updateAuthorDto;
    Object.assign(author, nestedData);

    const rsAuthor = await this.authorsRepository.save(author);
    return AuthorEntityToAuthorResponse.map(rsAuthor);
  }

  async add(requestedAuthor: CreateAuthorDto, isEntity: boolean = false) {
    try {
      const author = this.authorsRepository.create(AuthorCreateDTOToEntityMapper.map(requestedAuthor));
      await this.authorsRepository.save(author);
      return isEntity ? author : AuthorEntityToAuthorResponse.map(author);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.authorsRepository.delete(id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}