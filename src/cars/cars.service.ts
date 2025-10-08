import { Injectable } from "@nestjs/common";
import { Car } from "./interface/car";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class CarsService {
  constructor(private prisma: PrismaService) {}

  async create(car: Prisma.CarCreateInput) {
    return this.prisma.car.create({ data: car });
  }

  async findAll(filter?: string, page: number = 1) {
    const pageSize: number = 5;
    if (filter) {
      return this.prisma.car.findMany({
        where: {
          model: filter,
        },
        skip: (page - 1) * pageSize,
        take: page * pageSize,
      });
    }
    return this.prisma.car.findMany({
      skip: (page - 1) * pageSize,
      take: page * pageSize,
    });
  }

  async findOne(id: number) {
    return this.prisma.car.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findOneV2(id: number) {
    const car = await this.prisma.car.findUnique({
      where: {
        id: id,
      },
    });

    if (!car) return null;

    return {
      id: car.id,
      brand: car.make,
      model: car.model,
      year: car.year,
      colour: car.colour,
      status: car.status,
    };
  }

  async findAllAvailable() {
    return this.prisma.car.findMany({
      where: {
        status: "available",
      },
    });
  }

  async wholeCarUpdate(id: number, car: Car) {
    return this.prisma.car.update({
      where: {
        id: id,
      },
      data: car,
    });
  }

  async partialCarUpdate<K extends keyof Car>(
    id: number,
    property: K,
    value: Car[K],
  ) {
    console.log(value);
    return this.prisma.car.update({
      where: {
        id: id,
      },
      data: {
        [property]: value,
      },
    });
  }

  async remove(id: number) {
    await this.prisma.car.delete({ where: { id: id } });
  }
}
