import { EventEmitter, Injectable } from "@angular/core";

import { Subject } from "rxjs";
import { Transactions } from "../operations-page/transaction.model";
import { TransactionService } from "../operations-page/transaction.service";

import { Clients } from "./client.model";

@Injectable({ providedIn: "root" })
export class ClientsService {
  // clientsChanged = new Subject<Clients[]>();

  clientsChanged = new Subject<Clients[]>();
  
  startShow = new Subject<number>();
  transaction:Transactions;

  constructor() {}

  // private clients: Clients[] = [

  //     new Clients('كريم محمود الشندي',

  //         '29703120300199',

  //         '01273684675',

  //         'خالد بن الوليد ع 72 ب ش 19',

  //         '45465456465465',

  //         123000,

  //         '11558',

  //         '66665550',

  //         'احمد ماهر و المشرق'

  //     ),

  //     new Clients('محمداشرف عفيفي',

  //         '29703120300199',

  //         '01211045729',

  //         'عمر بن عبد العزيز',

  //         '121212121212121',

  //         50000,

  //         '11555458',

  //         '5454545',

  //         'محمد علي و التلاتيني'

  //     ),

  //     new Clients(

  //         'أحمد شلبي ',

  //         '29703120300199',

  //         '01245789998',

  //         'عمر بن عبد العزيز',

  //         '121212121212121',

  //         3000,

  //         '11555458',

  //         '5454545',

  //         'شارع طرح البحر خلف عبده كفته'

  //     )
  // ];

  private clients: Clients[] = [];

  // overRide the clients array
  setClients(clients) {
    this.clients = clients.pageOfItems;
    // console.log(this.clients);
    this.clientsChanged.next(this.clients);
  }

  getClients() {
    return this.clients.slice();
  }

  getClient(index: number) {
    return this.clients[index];
  }

  addClient(client: Clients) {
    this.clients.push(client);
    this.clientsChanged.next(this.clients.slice());
    // console.log(this.clients.clients.slice());
  }
  deleteClient(index: number) {
    this.clients.splice(index, 1);
    this.clientsChanged.next(this.clients.slice());
  }
}
