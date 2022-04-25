import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
    constructor(private vehiclesService: VehiclesService) {}

    @Get(':userId')
    findAll(@Param('userId') userId: string) {
        return this.vehiclesService.getVehiclesByUserId(userId);
    }

    @Post('/add')
    add(@Body() vehicle: {name: string, number: string, userId: string}) {
        return this.vehiclesService.addVehicle(vehicle);
    }

    @Patch('/edit')
    edit(@Body() vehicle: {name: string, number: string, id: string}) {
        return this.vehiclesService.editVehicle(vehicle);
    }

    @Delete(':vehicleId')
    delete(@Param('vehicleId') vehicleId: string) {
        return this.vehiclesService.removeVehicle({ id: vehicleId });
    }

}
