import { IsEmail, IsString } from "class-validator";

export class UserDTO {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;
}
