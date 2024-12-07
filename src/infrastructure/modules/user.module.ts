import { Module } from '@nestjs/common';
import { UserController } from '../controllers';
import { UserRepository } from '../repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities';
import {
  DisableUserUseCase,
  GetUsersUseCase,
} from 'src/application/use-cases/admin';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [DisableUserUseCase, GetUsersUseCase, UserRepository],
})
export class UserModule {}
