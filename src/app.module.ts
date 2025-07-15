import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { CompanyController } from './company/company.controller';
import { CompanyService } from './company/company.service';
import { CompanyModule } from './company/company.module';
import { JobController } from './job/job.controller';
import { JobService } from './job/job.service';
import { JobModule } from './job/job.module';
import { ApplicationController } from './application/application.controller';
import { ApplicationService } from './application/application.service';
import { ApplicationModule } from './application/application.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    UserModule,
    CompanyModule,
    JobModule,
    ApplicationModule,
  ],
  controllers: [
    AppController,
    UserController,
    CompanyController,
    JobController,
    ApplicationController,
  ],
  providers: [
    AppService,
    PrismaService,
    UserService,
    CompanyService,
    JobService,
    ApplicationService,
  ],
})
export class AppModule {}
