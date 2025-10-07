import { IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";
import { carStatus } from "../enum/carStatus.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCarDto {
  @ApiProperty({ example: "Astra" })
  @IsString({ message: "O modelo deve ser uma string." })
  @IsNotEmpty()
  model: string;

  @ApiProperty({ example: "Chevrolet" })
  @IsString({ message: "O fabricante deve ser uma string." })
  @IsNotEmpty()
  make: string;

  @ApiProperty({ example: 2007 })
  @IsInt({ message: "O ano deve ser um inteiro." })
  @IsNotEmpty()
  @Type(() => Number)
  year: number;

  @ApiProperty({ example: "Preto" })
  @IsNotEmpty()
  @IsString({ message: "A cor deve ser uma string." })
  colour: string;

  @ApiProperty({ example: "sold" })
  @IsNotEmpty()
  @IsString({ message: "O status deve ser uma string." })
  @IsEnum(carStatus)
  status: carStatus;
}
