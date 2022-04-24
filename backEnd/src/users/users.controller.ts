import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('/create')
    create(@Body() createUserDto: {name: string, password: string, email: string}) {
        console.log(createUserDto);
        this.usersService.createUser(createUserDto);
        return createUserDto;
    }

    @Post('/login')
    login(@Body() createUserDto: {name: string, password: string}) {
        
        return this.usersService.loginUser(createUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): string {
        return id;
    }
}
