import socketIO from 'socket.io-client';

export class SocketService {
    private socket;
    // private channel;

    constructor() {
        this.socket = socketIO('http://localhost:9000');
        
        this.socket.on('connect',  () => {
            console.log('Connected');

            // this.socket.emit('message', { test: 'test' });
            // this.socket.emit('identity', 0, (response: any) =>
            //     console.log('Identity:', response),
            // );
        });
        this.socket.on('exception', function (data: any) {
            console.log('event', data);
        });
        this.socket.on('disconnect', function () {
            console.log('Disconnected');
        });
        // this.pusher = new Pusher('e878109c033954f51de7', {
        //     cluster: 'ap2'
        // });

        // this.channel = this.pusher.subscribe('tnt-game-of-life-channel');
    }

    public getSocket = () => {
        return this.socket;
    }
    
    // public listenToOptions = () => {
    //     this.channel.bind('', function (data: any) {
    //         alert(JSON.stringify(data));
    //     });
    // }

    public publishAnswer = (answer: string, userName: string) => {
        return this.socket.emit('events', { type: 'answer', answer, userName });
        // this.channel.trigger('client-answer', {answer, userName});
    }

    public publishOptions = (options: { index: number; text: string }[]) => {
        return this.socket.emit('events', {type: 'options', options})
        // this.channel.trigger('client-options', { options });
    }

}

export const socketService = new SocketService();