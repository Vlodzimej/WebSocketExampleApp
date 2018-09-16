
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { WebSocketService } from '../websocket.service'

@Component({
    selector: 'app-chat',
    templateUrl: 'chat.component.html'
})
export class ChatComponent implements OnInit, OnDestroy {

    public name: string;
    public message: string;
    public lines: string[] = [];

    private socketSubscription: Subscription

    sendMessage(){
        this.socket.send(this.name+' : '+this.message);
    }

    constructor(private socket: WebSocketService) { }
    
    ngOnInit() {
        this.socket.connect()

        this.socketSubscription = this.socket.messages.subscribe((message: string) => {
            console.log('received message from server: ', message)
            this.lines.push(message);
        });
    }

    ngOnDestroy() {
        this.socketSubscription.unsubscribe()
    }

}


