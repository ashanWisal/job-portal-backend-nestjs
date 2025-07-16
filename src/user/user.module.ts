import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
  ],
})
export class UserModule {}

// we are using PrismaModule here because
