import { Subject, Observable, Observer } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { webSocket } from "rxjs/webSocket";

@Injectable()
export class SocketsService {
    ws: any;
    dataSub: Subject<any>;
    socketsServiceSub: Subject<any>;
  
    constructor() {
      this.initConnection();
    }

    public stop() {
      this.socketsServiceSub.unsubscribe();
    }
  
    public initConnection() {
        this.dataSub = new Subject<any>();
        this.socketsServiceSub =  webSocket("ws://localhost:8999");

        this.socketsServiceSub.subscribe(
           (data: string) => this.dataSub.next(data),
           error => this.dataSub.error(error)
        );
    }
}