import { Component, Input, OnInit, Output } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { AuthService } from './login/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'project';
  // islogged:Subscription;

  status = 'ONLINE';
  isConnected = true
  constructor(private authService:AuthService ,
    private connectionServeice:ConnectionService){
      this.connectionServeice.monitor().subscribe(isConnected=>{
        this.isConnected = isConnected;
        if(this.isConnected){
          this.status = "ONLINE";
          console.log(this.status)
        }else{
          this.status="OFFLINE"
          console.log(this.status)
        }
      })
    }

  ngOnInit() {
    this.authService.autoLogin();

  }
}


