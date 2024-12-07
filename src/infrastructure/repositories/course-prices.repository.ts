import { CoursePrice } from 'src/domain/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CoursePriceRepository {
  constructor(
    @InjectRepository(CoursePrice)
    private readonly repository: Repository<CoursePrice>,
  ) {}

  async get(courseId: string, options?: any): Promise<CoursePrice[]> {
    return this.repository.find({
      where: { course: { id: courseId } },
      ...options,
    });
  }

  async post(price: Partial<CoursePrice>): Promise<CoursePrice> {
    return this.repository.save(price);
  }
}
