import { WsResponse } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare class EventsGateway {
    server: Server;
    handleEvent(data: any): WsResponse<any>;
}
