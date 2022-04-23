import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth/login')
  create(@Body() createUserDto: {name: string, password: string}) {
    console.log(createUserDto);
    return createUserDto;
  }
}
