import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Users } from "./users.model";

@Injectable({ providedIn: "root" })
export class AdminService {
  userChanged = new EventEmitter<Users[]>();
  
  startedEditing = new Subject<number>();

  //   private users:Users[] = [
  //       new Users('kareem','1235','admin'),
  //       new Users('mahmoud','1235','admin')
  //   ]
  private users: Users[] = [];

  setusers(users: Users[]) {
    this.users = users;
    this.userChanged.emit(this.users.slice());
  }
  getusers() {
    return this.users.slice();
  }
  getuser(i: number) {
    return this.users[i];
  }

  adduser(user) {
    this.users.push(user);
    this.userChanged.emit(this.users.slice());
    // console.log(this.clients.clients.slice());
  }
  updateuser(index:number,newUser:Users){
    this.users[index]=newUser;
    this.userChanged.emit(this.users.slice());
  }

  deleteuser(i: number) {
    this.users.splice(i, 1);
    this.userChanged.emit(this.users.slice());
  }
}
