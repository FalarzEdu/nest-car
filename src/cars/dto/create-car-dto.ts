import { IsEnum, IsInt, IsString } from "class-validator";
import { Type } from "class-transformer";
import { carStatus } from "../enum/carStatus.enum";
import {ApiProperty} from "@nestjs/swagger";

export class CreateCarDto {
  @ApiProperty({ example: "Astra" })
  @IsString({ message: "O modelo deve ser uma string." })
  model: string;

  @ApiProperty({ example: "Chevrolet" })
  @IsString({ message: "O fabricante deve ser uma string." })
  make: string;

  @ApiProperty({ example: 2007 })
  @IsInt({ message: "O ano deve ser um inteiro." })
  @Type(() => Number)
  year: number;

  @ApiProperty({ example: "Preto" })
  @IsString({ message: "A cor deve ser uma string." })
  colour: string;

  @ApiProperty({ example: "sold" })
  @IsString({ message: "O status deve ser uma string." })
  @IsEnum(carStatus)
  status: carStatus;
}
