import { Course } from 'src/domain/entities';

export interface CreateCourseResponse {
  id: string;
}

export interface GetCoursesResponse {
  results: GetCoursesResponseResult[];
  filters: any;
}

export interface GetCoursesResponseResult {
  data: Partial<Course>;
  participants: number;
}
