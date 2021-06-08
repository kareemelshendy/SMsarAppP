import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";

import { DataStorageService } from "../shared/data-storage.service";
import { Clients } from "./client.model";
import { ClientsService } from "./client.service";

@Injectable({ providedIn: "root" })
export class ClientResolverService implements Resolve<Clients[]> {
  constructor(
    private dataSotrageService: DataStorageService,
    private clientService: ClientsService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const clients = this.clientService.getClients();
    if(clients.length ===0){

        return this.dataSotrageService.fetchClient();
    }else{
        return clients
    }
  }
}
