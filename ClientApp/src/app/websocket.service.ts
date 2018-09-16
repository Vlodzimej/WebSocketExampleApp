
import { Injectable } from '@angular/core'
import { QueueingSubject } from 'queueing-subject'
import { Observable } from 'rxjs/Observable'
import websocketConnect from 'rxjs-websockets'
import 'rxjs/add/operator/share'

@Injectable()
export class WebSocketService {
  private inputStream: QueueingSubject<string>
  public messages: Observable<string>

  public connect() {
    if (this.messages)
      return

    // Метод share() создаёт WebSocket при подписке первого наблюдателя.
    // Этот сокет делится с последующими наблюдателями и закрывается,
    // когда количество наблюдателей становится равно нулю.
    this.messages = websocketConnect(
      'ws://localhost:59344/ws',
      this.inputStream = new QueueingSubject<string>()
    ).messages.share()
  }

  public send(message: string): void {
    // Если WebSocket не подключен, то QueueingSubject обеспечит добавление
    // запросов в очередь для их повторной доставки при подключении WebSocket.
    this.inputStream.next(message)
  }
}

