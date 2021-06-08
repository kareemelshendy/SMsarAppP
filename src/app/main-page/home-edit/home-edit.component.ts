import { HttpClient } from "@angular/common/http";
import { Component, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { TransactionService } from "src/app/operations-page/transaction.service";
import { DataStorageService } from "src/app/shared/data-storage.service";
import { Clients } from "../client.model";
import { ClientsService } from "../client.service";

@Component({
  selector: "app-home-edit",
  templateUrl: "./home-edit.component.html",
  styleUrls: ["./home-edit.component.scss"],
})
export class HomeEditComponent implements OnInit, OnDestroy {
  @ViewChild("userform", { static: false }) userform: NgForm;
  showedClient: any;
  clients: Clients[];
  subscrption: Subscription;
  showMode = false;
  id: number;
  isLoading = false;
  nationalImage = null;
  commercialImage = null;
  taxCardImage = null;
  insuranceImage = null;
  errorMessage = "";
  alert: boolean = false;
  alertDanger: boolean = false;

  nationalIDImageUrl = "";
  commercialRecordImageUrl = "";
  taxCardImageUrl = "";
  insuranceImageUrl = "";

  @Input() index: number;

  constructor(
    private clientService: ClientsService,
    private route: ActivatedRoute,
    private router: Router,
    private dataStorageService: DataStorageService,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    console.log(`ShowMode: ${this.showMode}`);
    this.subscrption = this.clientService.startShow.subscribe(
      (index: number) => {
        this.showedClient = this.clientService.getClient(index);
        console.log(this.showedClient);
        this.showMode = true;
        console.log(`ShowMode: ${this.showMode}`);

        // console.log(this.showedClient)
        this.id = index;
        // console.log(this.userform.controls['username'])
        this.nationalIDImageUrl = this.showedClient.nationaIdImage;
        this.commercialRecordImageUrl = this.showedClient.commericalRecordImage;
        this.taxCardImageUrl = this.showedClient.taxCardImage;
        this.insuranceImageUrl = this.showedClient.insuranceImage;

        this.userform.setValue({
          name: this.showedClient.name,
          nationalId: this.showedClient.nationalId,
          phoneNumber: this.showedClient.phoneNumber,
          address: this.showedClient.address,
          taxCardNumber: this.showedClient.taxCardNumber,
          quotaValue: this.showedClient.quotaValue,
          commericalRecord: this.showedClient.commericalRecord,
          insuranceNumber: this.showedClient.insuranceNumber,
          addressOfCommericalRecord:
            this.showedClient.addressOfCommericalRecord,
          nationalImage: "",
          taxCardImage: "",
          insuranceImage: "",
          commercialImage: "",
        });
      }
    );

    this.showMode = false;
  }

  onAddToOperation() {
    console.log(this.id);
    this.router.navigate(["/operations"], {
      // queryParams:{nationalId:this.clientService.getClient(this.id).nationalId}
      queryParams: { id: this.id },
    });
  }

  onSelectNationaImage(event) {
    this.nationalImage = <File>event.target.files[0];
  }
  onSelectCommercialImage(event) {
    this.commercialImage = <File>event.target.files[0];
  }
  onSelecttaxCardImage(event) {
    this.taxCardImage = <File>event.target.files[0];
  }
  onSelectinsuranceImage(event) {
    this.insuranceImage = <File>event.target.files[0];
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    const formData = new FormData();
    formData.append("name", form.value.name);
    formData.append("nationalId", form.value.nationalId);
    formData.append("phoneNumber", form.value.phoneNumber);
    formData.append("address", form.value.address);
    formData.append("taxCardNumber", form.value.taxCardNumber);
    formData.append("quotaValue", form.value.quotaValue);
    formData.append("commericalRecord", form.value.commericalRecord);
    formData.append("insuranceNumber", form.value.insuranceNumber);
    formData.append(
      "addressOfCommericalRecord",
      form.value.addressOfCommericalRecord
    );
    formData.append("nationaIdImage", this.nationalImage);
    formData.append("taxCardImage", this.taxCardImage);
    formData.append("insuranceImage", this.insuranceImage);
    formData.append("commericalRecordImage", this.commercialImage);

    if (form.valid) {
      if (!this.showMode) {
        const newClient = new Clients(
          form.value.name,
          form.value.nationalId,
          form.value.phoneNumber,
          form.value.address,
          form.value.taxCardNumber,
          form.value.quotaValue,
          form.value.commericalRecord,
          form.value.insuranceNumber,
          form.value.addressOfCommericalRecord
        );
        this.clientService.addClient(newClient);
        // console.log(newClient);
        this.dataStorageService.storeClients(formData).subscribe(
          (res) => {
            if (res) {
              this.isLoading = false;
              console.log(res);
              this.alert = true;
              document.documentElement.scrollTop = 0; 
            } 
          },
          (errorMessage) => {
            if (errorMessage) {
              this.isLoading = false;
              this.alertDanger = true;
              document.documentElement.scrollTop = 0; 
            }
            this.errorMessage = errorMessage;
          }
        );
      } else {
        this.userform.reset();
        this.showMode = false;
        this.isLoading = false;
      }
      // console.log(`newClient: ${newClient.username}`);
      console.log("ShowMode: " + this.showMode);
      this.nationalIDImageUrl = "";
      this.commercialRecordImageUrl = "";
      this.taxCardImageUrl = "";
      this.insuranceImageUrl = "";
      form.reset();
    }
  }
  closeAlert() {
    this.alert = false;
  }
  closeAlertDanger() {
    this.alertDanger = false;
  }
  ngOnDestroy() {
    this.subscrption.unsubscribe();
  }
}
