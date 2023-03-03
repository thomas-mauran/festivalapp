import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageList: string[] = []


   log(s: string): void {
    this.messageList.push(s)
   }
   clear(): void {
    this.messageList = []
   }
}
