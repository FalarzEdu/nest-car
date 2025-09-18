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

  async update(id: number, car: Car) {
    return this.prisma.car.update({
      where: {
        id: id,
      },
      data: car,
    });
  }

  async remove(id: number) {
    await this.prisma.car.delete({ where: { id: id } });
  }
}
