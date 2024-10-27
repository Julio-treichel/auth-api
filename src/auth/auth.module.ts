import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: "jeanzada",
      signOptions: {
        expiresIn: "60s",
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
