import {ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import { Sale } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CarsService } from "../cars/cars.service";
import { carStatus } from "../cars/enum/carStatus.enum";

@Injectable()
export class SalesService {
  constructor(
    private prisma: PrismaService,
    private carsService: CarsService,
  ) {}

  async getAllSales(): Promise<Sale[]> {
    return this.prisma.sale.findMany();
  }

  async performSale(carId: number, price: number): Promise<Sale> {
    const car = await this.carsService.findOne(carId);

    if (!car) {
      throw new NotFoundException(`Carro de ID ${carId} não encontrado`);
    }

    if (car.status === carStatus.SOLD) {
      throw new ConflictException(`Carro de ID ${carId} já foi vendido.`);
    }

    const date = new Date();
    const sale = this.prisma.sale.create({
      data: {
        car_id: carId,
        price: price,
        date: date,
      },
    });

    await this.carsService.partialCarUpdate(carId, "status", carStatus.SOLD);

    return sale;
  }
}
