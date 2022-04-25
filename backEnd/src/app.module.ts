import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { VehiclesController } from './vehicles/vehicles.controller';
import { UsersService } from './users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VehiclesService } from './vehicles/vehicles.service';
import { Vehicle, VehicleSchema } from './vehicles/vehicle.schema';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/vehicleMonitoring'), MongooseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }])],
  controllers: [AppController, UsersController, VehiclesController],
  providers: [AppService, UsersService, VehiclesService],
})
export class AppModule {}
