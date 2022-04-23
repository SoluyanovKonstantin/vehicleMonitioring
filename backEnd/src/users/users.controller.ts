import { Body, Controller, Delete, Param, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Post('/create')
    create(@Body() createUserDto: {name: string, password: string, email: string}) {
        console.log(createUserDto);
        return createUserDto;
    }

    @Post('/login')
    login(@Body() createUserDto: {name: string, password: string}) {
        console.log(createUserDto);
        return createUserDto;
    }

    @Delete(':id')
    remove(@Param('id') id: string): string {
        return id;
    }
}
