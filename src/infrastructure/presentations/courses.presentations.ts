import { Course } from 'src/domain/entities';

export interface CreateCourseResponse {
  id: string;
}

export interface GetCoursesResponse {
  results: GetCoursesResponseResult[];
  filters: any;
}

export interface GetCoursesResponseResult extends Course {
  participantCount: number;
}

export interface GetCourseDetailsResponse {
  data: Partial<Course>;
  prices: GetCourseDetailsPrice[];
  participants: number;
  isParticipant: boolean;
}

export interface GetCourseDetailsPrice {
  value: number;
  currency: string;
}
