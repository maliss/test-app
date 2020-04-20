import { Subject, Observable, Observer } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { webSocket } from "rxjs/webSocket";
import { environment } from "../../environments/environment";

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
        const webSocketUrl = environment.production ? "test-ubisoft-server.herokuapp.com/" : "localhost:8999";

        this.dataSub = new Subject<any>();
        this.socketsServiceSub =  webSocket(`ws://${webSocketUrl}`);

        this.socketsServiceSub.subscribe(
           (data: string) => this.dataSub.next(data),
           error => this.dataSub.error(error)
        );
    }
}