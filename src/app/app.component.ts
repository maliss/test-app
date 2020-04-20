import { Component } from "@angular/core";
import { SocketsService } from './services/socket.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})

export class AppComponent {
  socketsService: SocketsService;

  constructor(socketsService:SocketsService) {
    this.socketsService = socketsService;
  }
  ngOnDestroy() {
    this.socketsService.stop();
  }
}
