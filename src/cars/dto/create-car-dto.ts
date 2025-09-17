import { IsEnum, IsInt, IsString } from "class-validator";
import { Type } from "class-transformer";
import { carStatus } from "../enum/carStatus.enum";

export class CreateCarDto {
  @IsString({ message: "O modelo deve ser uma string." })
  model: string;

  @IsString({ message: "O fabricante deve ser uma string." })
  make: string;

  @IsInt({ message: "O ano deve ser um inteiro." })
  @Type(() => Number)
  year: number;

  @IsString({ message: "A cor deve ser uma string." })
  colour: string;

  @IsString({ message: "O status deve ser uma string." })
  @IsEnum(carStatus)
  status: string;
}
