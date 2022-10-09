import Pusher from "pusher-js";

export class PusherService {
    private pusher;
    private channel;

    constructor() {
        this.pusher = new Pusher('e878109c033954f51de7', {
            cluster: 'ap2'
        });

        this.channel = this.pusher.subscribe('tnt-game-of-life-channel');
    }

    public getChannel = () => {
        return this.channel;
    }
    
    // public listenToOptions = () => {
    //     this.channel.bind('', function (data: any) {
    //         alert(JSON.stringify(data));
    //     });
    // }

    public publishAnswer = (answer: string, userName: string) => {
        this.channel.trigger('client-answer', {answer, userName});
    }

    public publishOptions = (options: { index: number; text: string }[]) => {
        this.channel.trigger('client-options', { options });
    }

}

export const pusherService = new PusherService();