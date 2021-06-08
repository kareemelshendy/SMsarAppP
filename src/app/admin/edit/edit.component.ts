import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/login/auth.service";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { AdminService } from "../admin.service";
import { Users } from "../users.model";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class EditComponent implements OnInit, OnDestroy {
  @Output() isEdit = new EventEmitter<void>();
  @ViewChild('editform', { static: false }) editform: NgForm;

  editMode = false;
  subscription: Subscription;
  editedItemIndex: number;
  id:string
  editedItem: Users;
  constructor(
    private AuthService: AuthService,
    private adminService: AdminService,
    private dataStorageService:DataStorageService
  ) {}

  ngOnInit() {
    this.subscription = this.adminService.startedEditing
      .subscribe(
        (index) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.adminService.getuser(index);
          this.id = this.adminService.getuser(index)._id;
          this.editform.setValue({
            username: this.editedItem.name,
            password:this.editedItem.password,
            role:this.editedItem.role
          })
        }
        
      );
      
  }

  onSubmit(form: NgForm) {
    console.log(form.value);

    this.isEdit.emit();

    const newUser = new Users(
      form.value.username,
      form.value.password,
      form.value.role
    );
    if (this.editMode) {
      this.adminService.updateuser(this.editedItemIndex, newUser);
      this.dataStorageService.updateUser(this.id,newUser);
    } else {
      this.adminService.adduser(newUser);
      this.AuthService.signup(
        form.value.username,
        form.value.role,
        form.value.password
      ).subscribe(
        (resData) => {
          console.log(resData);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  onClose() {
    this.isEdit.emit();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
