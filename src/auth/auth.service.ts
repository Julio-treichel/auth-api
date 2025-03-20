import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthResponse } from "./types/auth.types";
import { UserDTO } from "./dto/user.dto";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthResponse | null> {
    const mockUser = new UserDTO();
    mockUser.id = "1q2w3e";
    mockUser.name = "Julio Treichel";
    mockUser.email = "julio@treichel.com";
    mockUser.password = "123mudar";

    if (email !== mockUser.email) {
      return null;
    }

    if (password !== mockUser.password) {
      return null;
    }

    const { password: _, ...userWithoutPassword } = mockUser;
    return this.signIn(userWithoutPassword);
  }

  private signIn(user: Omit<UserDTO, "password">): AuthResponse {
    return {
      accessToken: this.jwtService.sign(user),
    };
  }
}
