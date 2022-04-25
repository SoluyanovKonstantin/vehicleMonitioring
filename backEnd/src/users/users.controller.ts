import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post('/create')
    create(@Body() createUserDto: {name: string, password: string, email: string}) {
        this.usersService.createUser(createUserDto).then(() => {
            return createUserDto;
        }).catch(err => { throw new Error('dublicate name')});
    }

    @Post('/login')
    login(@Body() createUserDto: {name: string, password: string}) {
        
        return this.usersService.loginUser(createUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.deleteUser(id);
    }
}
