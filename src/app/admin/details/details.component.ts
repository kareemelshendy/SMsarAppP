import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AdminService } from '../admin.service';
import { Users } from '../users.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  isEdit= false;
 users:Users[];
 adminSub:Subscription
  constructor(
    private dataSrorageService:DataStorageService,
    private adminService:AdminService,
    private dataStorageService:DataStorageService
  ) { }

  ngOnInit() {
    this.dataSrorageService.fetchUsers();
    this.users = this.adminService.getusers();
    this.adminSub= this.adminService.userChanged.subscribe((users:Users[])=>{
      this.users= users
    })
    
  }
  onAddUser(){
    this.isEdit = true
  }

  onDelete(i){
    if (confirm('are you sure to delete?')) {
      let _id = this.adminService.getuser(i)._id;
      console.log(_id)
      this.dataStorageService.deleteUser(_id);
    }
    this.adminService.deleteuser(i);
  }
  onUpdate(index:number){
    this.isEdit =true;
    console.log(this.isEdit)
    this.adminService.startedEditing.next(index);
  }
  onFinsh(){
    this.isEdit = false;
  }

}
