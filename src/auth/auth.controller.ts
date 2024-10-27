import { Controller, Body, Post, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResponse } from "./types/auth.types";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() body): Promise<AuthResponse> {
    const isUserValid = await this.authService.validateUser(
      body.email,
      body.password,
    );

    if (!isUserValid) {
      throw new UnauthorizedException("BANIDO!");
    }

    return isUserValid;
  }
}
