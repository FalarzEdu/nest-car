import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";
import { CarsModule } from "./cars/cars.module";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [SharedModule, CoreModule, CarsModule, PrismaModule, AuthModule, SalesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
