import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({ example: "joao@email.com" })
  @IsString()
  email: string;

  @ApiProperty({ example: "12345678" })
  @IsString()
  password: string;
}
