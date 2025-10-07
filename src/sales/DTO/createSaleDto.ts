import { IsNumber, IsPositive } from "class-validator";

export class CreateSaleDto {
  @IsNumber()
  @IsPositive({ message: "O ID deve ser positivo." })
  carId: number;

  @IsNumber()
  @IsPositive({ message: "O preço deve ser positivo." })
  price: number;
}
