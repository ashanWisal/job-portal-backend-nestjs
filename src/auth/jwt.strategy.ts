import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('SECRET_KEY')!,
    });
  }

  async validate(payload: any): Promise<any> {
    // Optionally fetch fresh user data from DB
    const user = await this.prisma.user.findFirst({
      where: { id: payload.id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // This user object will be attached to req.user
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}

// jwt strategey using passport strategy it does how the token is verified and decoded