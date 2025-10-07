import { IsNumber, IsPositive } from "class-validator";

export class CreateSaleDto {
  @IsNumber()
  @IsPositive()
  carId: number;

  @IsNumber()
  @IsPositive()
  price: number;
}