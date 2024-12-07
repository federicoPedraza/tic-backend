import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCourseDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsDateString()
  startDate?: Date;

  @IsDateString()
  endDate: Date;
}

export class GetCoursesDTO {
  @IsOptional()
  @IsBoolean()
  participant?: boolean;
}

export class JoinCourseDTO {
  @IsNotEmpty()
  @IsString()
  courseId: string;

  @IsNumber()
  @IsOptional()
  paid: number;
}
