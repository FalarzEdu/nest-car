import { Module } from "@nestjs/common";
import { SalesService } from "./sales.service";
import { SalesController } from "./sales.controller";
import { PrismaService } from "../prisma/prisma.service";
import { CarsModule } from "../cars/cars.module";
import { CarsService } from "../cars/cars.service";

@Module({
  imports: [CarsModule],
  controllers: [SalesController],
  providers: [SalesService, PrismaService, CarsService],
})
export class SalesModule {}
