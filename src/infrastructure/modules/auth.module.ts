import { Module } from '@nestjs/common';
import { AuthController } from '../controllers';
import {
  CreateTokenUseCase,
  LoginUseCase,
  SignUpUseCase,
} from 'src/application/use-cases/users';
import { UserRepository } from '../repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../config/auth/local.strategy';
import { JwtStrategy } from '../config/auth/jwt.stategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ session: false }),
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    SignUpUseCase,
    CreateTokenUseCase,
    UserRepository,
    LocalStrategy,
    JwtStrategy,
    ConfigService,
  ],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
