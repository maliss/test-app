import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { SocketsService } from './services/socket.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent, DashboardComponent],
  providers: [SocketsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
