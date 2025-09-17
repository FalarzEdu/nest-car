import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put, Query, UseFilters, UseInterceptors,
} from "@nestjs/common";
import { CarsService } from "./cars.service";
import {CreateCarDto} from "./dto/create-car-dto";
import {QueryFilterDto} from "./dto/query-filter-dto";
import {ResponseInterceptor} from "../response/response.interceptor";
import {CustomExceptionFilter} from "../custom-exception/custom-exception.filter";

@Controller("cars")
@UseInterceptors(ResponseInterceptor)
// @UseFilters(CustomExceptionFilter)
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

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

  @Put(":id")
  @HttpCode(200)
  update(@Param("id") id: number, @Body() updateItem: any) {
    return this.carsService.update(id, updateItem);
  }

  @Patch(":id")
  @HttpCode(200)
  partialUpdate(@Param("id") id: number, @Body() updateItem: any) {
    return this.carsService.update(id, updateItem);
  }

  @Delete(":id")
  @HttpCode(204)
  delete(@Param("id") id: number) {
    return this.carsService.remove(id);
  }
}
