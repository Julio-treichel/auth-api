import { Controller, Body, Post, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResponse } from "./types/auth.types";
import { LoginDTO } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() loginDto: LoginDTO): Promise<AuthResponse> {
    const authResult = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!authResult) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    return authResult;
  }
}
