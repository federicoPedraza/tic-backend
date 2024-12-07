import { Module } from '@nestjs/common';
import { AuthModule, CourseModule } from './infrastructure/modules';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './infrastructure/controllers';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'squid',
      password: 'squid',
      host: 'localhost',
      port: 3306,
      database: 'theenglishcrab',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
