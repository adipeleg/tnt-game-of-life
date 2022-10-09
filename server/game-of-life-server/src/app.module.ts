import { EventsGateway } from './gateway.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

console.log(join(__dirname, './../../../../', 'client'));
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, './../../../', 'client/build'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
