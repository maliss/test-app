import { Subject, Observable, Observer } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { webSocket } from "rxjs/webSocket";

@Injectable()
export class SocketsService {
    ws: any;
    dataSub: Subject<any>;
  
    constructor() {
      this.initConnection();
    }
  
    public initConnection() {
        this.dataSub = new Subject<any>();
        const subject = webSocket("ws://localhost:8999");

        subject.subscribe(
           (data: string) => this.dataSub.next(data),
           error => this.dataSub.error(error)
        );
    }
}