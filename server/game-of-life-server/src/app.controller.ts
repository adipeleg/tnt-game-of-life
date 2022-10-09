import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('options')
  handleEvent(@Body() data: string): string {
    // console.log(data);
    return data;
  }
}
