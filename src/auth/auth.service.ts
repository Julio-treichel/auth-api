import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthResponse } from "./types/auth.types";
import { UserDTO } from "./dto/user.dto";
import { validate } from "class-validator";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthResponse | null> {
    const user = new UserDTO();
    (user.id = "1q2w3e"),
      (user.name = "Julio Treichel"),
      (user.email = "julio@treichel.com"),
      (user.password = "123mudar");

    const errors = await validate(user);
    if (errors.length > 0) {
      console.error(errors);
      return null;
    }

    if (email === user.email && password === user.password) {
      return this.signIn({ ...user, password: undefined });
    }

    return null;
  }

  //como saber quando usar DTO ou Interface apenas?
  private signIn(user: UserDTO): AuthResponse {
    return {
      accessToken: this.jwtService.sign(user),
    };
  }
}
