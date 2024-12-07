import { Course } from 'src/domain/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CourseRepository {
  constructor(
    @InjectRepository(Course) private readonly repository: Repository<Course>,
  ) {}

  async get(course: Partial<Course>): Promise<Course | undefined> {
    return this.repository.findOne({ where: course });
  }

  async getAll(filters: Partial<Course>, options?: any): Promise<Course[]> {
    return this.repository.find({ where: filters, ...options });
  }

  async post(course: Partial<Course>): Promise<Course> {
    return this.repository.save(course);
  }
}
