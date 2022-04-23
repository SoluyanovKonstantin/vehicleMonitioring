import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('vehicles')
export class VehiclesController {
    @Get(':userId')
    findAll(@Param('userId') userId: string) {
        return userId;
    }

    @Post('/add')
    add(@Body() vehicle: {name: string, number: string}) {
        return vehicle;
    }

    @Patch('/edit')
    edit(@Body() vehicle: {name: string, number: string}) {
        return vehicle
    }

    @Delete(':vehicleId')
    delete(@Param('vehicleId') vehicleId: string) {
        return vehicleId;
    }
}
