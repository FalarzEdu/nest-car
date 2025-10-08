import { ApiProperty } from "@nestjs/swagger";
import {IsOptional, IsString} from "class-validator";
import {Role} from "@prisma/client";

export class LoginDto {
  @ApiProperty({ example: "joao@email.com" })
  @IsString()
  email: string;

  @ApiProperty({ example: "12345678" })
  @IsString()
  password: string;
}
