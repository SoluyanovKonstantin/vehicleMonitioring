import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { VehiclesController } from './vehicles/vehicles.controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController, VehiclesController],
  providers: [AppService],
})
export class AppModule {}
