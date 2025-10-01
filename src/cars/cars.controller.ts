import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseFilters, UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CarsService } from "./cars.service";
import { CreateCarDto } from "./dto/create-car-dto";
import { QueryFilterDto } from "./dto/query-filter-dto";
import { ResponseInterceptor } from "../response/response.interceptor";
import { CustomExceptionFilter } from "../custom-exception/custom-exception.filter";
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";

@Controller("cars")
@UseInterceptors(ResponseInterceptor)
@UseFilters(CustomExceptionFilter)
@UseGuards(JwtAuthGuard)
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Roles("admin")
  @Post()
  @HttpCode(201)
  create(@Body() createCar: CreateCarDto) {
    return this.carsService.create(createCar);
  }

  @Get()
  @HttpCode(200)
  findAll(@Query() queryFilter: QueryFilterDto) {
    return this.carsService.findAll(queryFilter.filter, queryFilter.page);
  }

  @Get(":id")
  @HttpCode(200)
  findOne(@Param("id") id: number) {
    return this.carsService.findOne(+id);
  }

  @Roles("admin")
  @Put(":id")
  @HttpCode(200)
  update(@Param("id") id: number, @Body() updateItem: any) {
    return this.carsService.update(id, updateItem);
  }

  @Roles("admin")
  @Patch(":id")
  @HttpCode(200)
  partialUpdate(@Param("id") id: number, @Body() updateItem: any) {
    return this.carsService.update(id, updateItem);
  }

  @Roles("admin")
  @Delete(":id")
  @HttpCode(204)
  delete(@Param("id") id: number) {
    return this.carsService.remove(id);
  }
}
