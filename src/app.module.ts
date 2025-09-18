import {MiddlewareConsumer, Module} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";
import { CarsModule } from "./cars/cars.module";
import { AuthMiddleware } from "./auth/auth.middleware";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [SharedModule, CoreModule, CarsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("*");
  }
}
