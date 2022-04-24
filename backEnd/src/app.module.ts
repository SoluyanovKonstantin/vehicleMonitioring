import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { VehiclesController } from './vehicles/vehicles.controller';
import { UsersService } from './users/users.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/usersdb')],
  controllers: [AppController, UsersController, VehiclesController],
  providers: [AppService, UsersService],
})
export class AppModule {}
