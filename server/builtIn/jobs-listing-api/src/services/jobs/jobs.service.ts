import { JobEntity } from '@/entities/job.entity';
import { JobCreateDTOToEntityMapper } from '@/mappers/jobs/job.create.mapper';
import { JobEntityToJobResponse } from '@/mappers/jobs/job.response.mapper';
import { DeepPartial, InjectRepository, IsNull, Repository } from '@core-api/nest-typeorm-postgres';
import { IPagination, IPagingFilter } from '@core-ui/jobs-listing-types';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(JobEntity)
    private jobsRepository: Repository<JobEntity>,
  ) { }

  async findAll(filter: IPagingFilter & any): Promise<IPagination<any>> {
    const where: any = { deletedAt: IsNull() };

    if (filter.category) {
      where.categoryData = { id: filter.category };
    }

    // if (filter.query) {
    //   where.summary = { $ilike: `%${filter.query}%` };; // TODO: summary string includes query
    //   where.skills = { $ilike: `%${filter.query}%` };; // TODO: or summary string includes query
    // }
    const query = this.jobsRepository.createQueryBuilder('job');
    if (filter.query) {
      query.where(where)
           .andWhere('job.summary ILIKE :query OR job.skills ILIKE :query', { query: `%${filter.query}%` });
    } else {
      query.where(where);
    }

    const [jobs, count] = await query
      .take(filter.limit)
      .skip(filter.offset)
      .getManyAndCount();
    
    return {
      data: JobEntityToJobResponse.maps(jobs),
      limit: filter.limit || 10,
      offset: filter.offset || 0,
      total: count,
    } as IPagination<any>;
  }

  async findOne(id: number): Promise<any | null> {
    const job = await this.jobsRepository.findOne({ where: { id: id, deletedAt: undefined } });

    return job ? JobEntityToJobResponse.map(job) : job;
  }

  async update(jobId: number, updateJobDto: any) {
    const job = await this.jobsRepository.findOne({
      where: {
        id: jobId,
      },
    });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    const { id, ...nestedData } = updateJobDto;
    Object.assign(job, nestedData);

    const rsJob = await this.jobsRepository.save(job);
    return JobEntityToJobResponse.map(rsJob);
  }

  async patchUpdate(jobId: number, updateJobDto: DeepPartial<any>) {
    const job = await this.jobsRepository.findOne({
      where: { id: jobId },
    });
    if (!job) {
      throw new Error('Job not found');
    }
    const { id, ...nestedData } = updateJobDto;
    Object.assign(job, nestedData);

    const rsJob = await this.jobsRepository.save(job);
    return JobEntityToJobResponse.map(rsJob);
  }

  async sortDelete(id: number): Promise<void> {
    try {
      await this.jobsRepository.softDelete(id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async add(requestedJob: any, isEntity: boolean = false) {
    try {
      const job = this.jobsRepository.create(JobCreateDTOToEntityMapper.map(requestedJob));
      await this.jobsRepository.save(job);
      return isEntity ? job : JobEntityToJobResponse.map(job);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.jobsRepository.delete(id);
    } catch (error: any) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}