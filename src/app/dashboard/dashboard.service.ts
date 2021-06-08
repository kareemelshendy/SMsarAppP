import { Injectable } from "@angular/core";
import { Clients } from "../main-page/client.model";
import { DataStorageService } from "../shared/data-storage.service";

@Injectable({providedIn:'root'})
export class DashboardService {
  clients: Clients[];
  number:number
  constructor(private dataStoraceService: DataStorageService) {}

  getClientNumber() {
    this.dataStoraceService.fetchClient().subscribe((res) => {
      this.clients = res;
      console.log(this.clients.length)
    //   for (let i = 0; i < this.clients.length; i++) {
    //       this.number++
    //       console.log(this.number)
    //   }
    });
  }
}
